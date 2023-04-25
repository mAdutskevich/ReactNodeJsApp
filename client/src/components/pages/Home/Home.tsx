import React from 'react';
import { format, } from 'date-fns';
import { DATETIME_FORMAT } from 'constants/constants';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/routes';
import { api } from 'api/axiosSettings';
import { requestApi } from 'api/requests';
import { CircleButton } from 'atoms/CircleButton';
import classes from './Home.module.scss';

interface IUser {
    name: string;
    surname: string;
    code: string;
}

interface IEvent {
    title: string;
    description: string;
    address: string;
    participantsMin: number;
    participantsMax: number;
    dateFrom: number;
    dateTo: number;
    userCode: string;
    author: IUser;
}

const getAuthor = (name: string, surname: string, code: string) => {
    let author = code.substring(0, 6);

    if (name || surname) {
        author = `${name ? name : ''} ${surname ? surname : ''}`;

        author.trim();
    }

    return author;
};

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = React.useState<IEvent[]>([]);

    React.useEffect(() => {
        api(requestApi.getEvents(localStorage.getItem('Authorization')))
            .then((res) => {
                console.log('res', res);
                setEvents(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAddEvent = () => {
        navigate(routes.eventNew);
    };

    return (
        <div className={classes.home}>
            {events.map((item, index) => {
                return (
                    <div
                        role="presentation"
                        key={index}
                        className={classes.event}
                    >
                        <div className={classes.info}>
                            <div className={classes.title}>{item.title}</div>

                            {item.participantsMax && (
                                <div className={classes.participants}>
                                    limit: {item.participantsMax}
                                </div>
                            )}
                        </div>
                        <div className={classes.details}>
                            <div className={classes.date}>
                                {format(item.dateFrom * 1000, DATETIME_FORMAT)}
                                {item.dateTo && ` - ${format(item.dateTo * 1000, DATETIME_FORMAT)}`}
                            </div>
                            <div className={classes.author}>
                                {getAuthor(item.author.name, item.author.surname, item.userCode)}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className={classes.addEventButton}>
                <CircleButton onClick={handleAddEvent} />
            </div>
        </div>
    );
};
