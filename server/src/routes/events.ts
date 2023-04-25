import express from 'express';
import jwt_decode from 'jwt-decode';
import model from 'models';
import { validateToken } from 'middlewares/authMiddleware';
import { routes } from 'constants/routes';
import { AUTHORIZATION } from 'constants/constants';
import { ErrorCode } from 'enums';
import { IToken, IEvent, IEventsItemModel, IEventWithAuthor, IUser } from 'interfaces';
import { RouteError } from 'utils';

const router = express.Router();

router.get(routes.direct, validateToken, async (req, res) => {
    const eventsListData: IEventsItemModel[] = await model.events.findAll({
        attributes: [
            'title',
            'description',
            'address',
            'participantsMin',
            'participantsMax',
            'dateFrom',
            'dateTo',
            'userCode'
        ]
    });

    const eventsList: IEvent[] = eventsListData.map((item) => item.dataValues);

    const eventsWithAuthors = await Promise.all(
        eventsList.map(async (event) => {
            const author: IUser = await model.users.findOne({
                where: { code: event.userCode },
                attributes: ['name', 'surname', 'code']
            });

            const eventWithAuthor: IEventWithAuthor = {
                ...event,
                author
            };

            return eventWithAuthor;
        })
    );

    res.json(eventsWithAuthors);
});

router.post(routes.new, validateToken, async (req, res) => {
    const accessToken: string = req.header(AUTHORIZATION);
    const decodedToken: IToken = jwt_decode(accessToken);
    const code = decodedToken.code;
    const user: IUser = await model.users.findOne({ where: { code } });
    let event: IEvent;

    if (!user) {
        res.status(401).json({
            errors: [new RouteError(ErrorCode.UNAUTHORIZED_USER_NOTFOUND)]
        });
    } else {
        event = {
            ...req.body,
            userCode: user.code
        };
    }

    try {
        await model.events.create(event);
        res.json(event);
    } catch (err) {
        res.json(err);
    }
});

export { router };
