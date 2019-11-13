import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import logger from 'koa-morgan';
import bodyParser from 'koa-body';

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

router.get('/', ctx => (ctx.body = '테스트'));

app.use(logger('dev'));
app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
