import Router from 'koa-router';
import * as postsCtrl from './posts';
import { checkLogin, myPost, getById } from '../../utils';

const posts = new Router();

posts.post('/', checkLogin, postsCtrl.write);
posts.get('/', postsCtrl.list);

const post = new Router();

post.get('/', postsCtrl.read);
post.delete('/', checkLogin, myPost, postsCtrl.remove);
post.patch('/', checkLogin, myPost, postsCtrl.update);

posts.use('/:id', getById, post.routes());

export default posts;
