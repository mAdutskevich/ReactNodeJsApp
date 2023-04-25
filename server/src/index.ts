import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import appConfig from 'config/config';
import db from 'models';
import { router as eventsRouter } from './routes/events';
import { router as usersRouter } from './routes/users';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/events', eventsRouter);
app.use('/auth', usersRouter);

db.sequelize.sync().then(() => {
    app.listen(appConfig.PORT, () => {
        console.log(
            `Server is running on port: http://localhost:${appConfig.PORT}`
        );
    });
});
