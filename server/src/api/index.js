import Router from 'koa-router';
import auth from './auth';
import posts from './posts';

// Image Upload Module
import fs from 'fs';
import path from 'path';
import moment from 'moment';

import Post from '../models/Post';

const api = new Router();

// Image Upload Route
api.post('/upload', async (ctx, next) => {
  if ('POST' != ctx.method) return await next();

  let uploadPath = '';

  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  const originalFilename = file.name;
  const newFilename = `${moment().format('YYYYMMDD_HHmmdd')}_${originalFilename}`;

  if (process.env.NODE_ENV === 'development') {
    uploadPath = path.join(__dirname, '../../../client/uploads');
  } else if (process.env.NODE_ENV === 'production') {
    uploadPath = path.join(__dirname, '../../uploads');
  }

  !fs.existsSync(uploadPath) && fs.mkdirSync(uploadPath);

  const stream = fs.createWriteStream(path.join(uploadPath, newFilename));

  reader.pipe(stream);
  console.log(`Image Uploading ${file.name} -> ${stream.path}`);

  ctx.body = newFilename;
});

api.get('/upload/:id', async (ctx, next) => {
  if ('GET' != ctx.method) return await next();

  const { id } = ctx.params;
  const image = fs.readFileSync(`${__dirname}/../../uploads/${id}`);

  try {
    ctx.body = await image;
  } catch (err) {
    ctx.throw(500, err);
  }
});

api.use('/auth', auth.routes());
api.use('/posts', posts.routes());

export default api;
