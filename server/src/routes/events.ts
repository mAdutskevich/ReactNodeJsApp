import express from 'express';
import jwt_decode from 'jwt-decode';
import model from '../models';
import { validateToken } from '../middlewares/authMiddleware';
import RouteError from '../utils/RouteError';
import { ErrorCode } from '../enums/ErrorCode';

const router = express.Router();

interface IEvent {
    title: string;
    description: string;
    address: string;
    participantsMin: number;
    participantsMax: number;
    dateFrom: number;
    dateTo: number;
    userCode: string;
}

interface IUser {
    name: string;
    surname: string;
    code: string;
}

interface IEventWithAuthor extends IEvent {
    author: IUser;
}

interface IToken {
    code: string;
    exp: number;
}

interface IEventsItemModel {
    dataValues: IEvent;
}

router.get('/', validateToken, async (req, res) => {
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

// router.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     const post = await Posts.findByPk(id);
//     res.json(post);
// });

router.post('/new', validateToken, async (req, res) => {
    const accessToken: string = req.header('Authorization');
    const decodedToken: IToken = jwt_decode(accessToken);
    console.log('decodedToken', decodedToken);
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
