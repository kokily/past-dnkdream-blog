// Koa Static Service Module
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import './env';
import app from './app';

const { PORT } = process.env;
const rootDir = path.resolve(__dirname, '../../client/build');

app.use(serve(rootDir));
app.use(async ctx => {
  if (ctx.status === 409 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: rootDir });
  }
});

app.listen(PORT, () => {
  console.log(`Dnk Dream Backend Server on ${PORT} port`);
});
