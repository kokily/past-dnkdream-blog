import Joi from 'joi';
import Post from '../../models/Post';

// 포스트 작성
export const write = async ctx => {
  const data = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    thumbnail: Joi.string(),
  });

  const result = Joi.validate(ctx.request.body, data);

  if (result.error) {
    ctx.status = 400;
    console.log(result.error);
    return;
  }

  const { title, body, tags, thumbnail } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    thumbnail,
    user: ctx.state.user,
  });

  try {
    await post.save();

    ctx.body = post;
  } catch (err) {
    ctx.throw(500, err);
  }
};

// 포스트 리스트 출력 - query -> page, title, tag
export const list = async ctx => {
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { title, tag } = ctx.query;
  const query = {
    ...(title ? { title: { $regex: title } } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(8)
      .skip((page - 1) * 8)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    const limitBody = post => ({
      ...post,
      title: post.title.length < 15 ? post.title : `${post.title.slice(0, 15)}...`,
      body: post.body.length < 100 ? post.body : `${post.body.slice(0, 100)}...`,
    });

    ctx.set('Last-Page', Math.ceil(postCount / 8));
    ctx.body = posts.map(limitBody);
  } catch (err) {
    ctx.throw(500, err);
  }
};

// 포스트 세부보기
export const read = async ctx => {
  ctx.body = ctx.state.post;
};

// 포스트 삭제
export const remove = async ctx => {
  const { id } = ctx.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (err) {
    ctx.throw(500, err);
  }
};

// 포스트 수정
export const update = async ctx => {
  const { id } = ctx.params;

  const data = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    thumbnail: Joi.string(),
  });

  const result = Joi.validate(ctx.request.body, data);

  if (result.error) {
    ctx.status = 400;
    console.log(result.error);
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, { new: true }).exec();

    if (!post) {
      ctx.status = 404;
      return;
    }

    ctx.body = post;
  } catch (err) {
    ctx.throw(500, err);
  }
};
