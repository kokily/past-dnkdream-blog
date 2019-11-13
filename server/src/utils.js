import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from './models/User';
import Post from './models/Post';

// JWT 미들웨어
export const jwt_middleware = async (ctx, next) => {
  const token = ctx.cookies.get('__dnkdream_blog_auth__');

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };

    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp - now < 60 * 60 * 24 * 1) {
      const user = await User.findById(decoded.id);
      const token = user.generateToken();

      ctx.cookies.set('__dnkdream_blog_auth__', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    return next();
  } catch (err) {
    console.log(err);
    return next();
  }
};

// 로그인 체크
export const checkLogin = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
};

// 글 작성자 확인
export const myPost = (ctx, next) => {
  const { user, post } = ctx.state;

  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

// 포스트 ID 값 조회 보조
export const getById = async (ctx, next) => {
  const { id } = ctx.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    
    return next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
