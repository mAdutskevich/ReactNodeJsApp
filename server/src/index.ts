import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import appConfig from './config/config';
import db from './models';

const app = express();

app.use(express.json());
app.use(cors());


// Routers
// const postsRouter = require('./routes/Posts');
// app.use('/posts', postsRouter);

import { router as eventsRouter } from './routes/events';
app.use('/events', eventsRouter);

// const commentsRouter = require('./routes/Comments');
// app.use('/comments', commentsRouter);

// const usersRouter = require('./routes/users');
import { router as usersRouter } from './routes/users';
app.use('/auth', usersRouter);

db.sequelize.sync().then(() => {
    app.listen(appConfig.PORT, () => {
        console.log(
            `Server is running on port: http://localhost:${appConfig.PORT}`
        );
    });
});
