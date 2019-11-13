import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import logger from 'koa-morgan';
import bodyParser from 'koa-body';
import { jwt_middleware } from './utils';

// Routes
import api from './api';

const app = new Koa();
const router = new Router();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

router.use('/api', api.routes());

app.use(logger('dev'));
app.use(jwt_middleware);
app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
