import Joi from 'joi';
import User from '../../models/User';

// 회원가입: 관리자 등록 후 막을 예정
export const register = async ctx => {
  const data = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = Joi.validate(ctx.request.body, data);

  if (result.error) {
    ctx.status = 400;
    console.log(result.error);
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    const exists = await User.findByUsername(username);

    if (exists) {
      ctx.status = 409;
      return;
    }

    const user = new User({ username });

    await user.setPassword(password);
    await user.save();

    ctx.body = user.serialize();
  } catch (err) {
    ctx.throw(500, err);
  }
};

// 로컬 로그인 - 나중에 소셜 로그인도 구현 예정
export const login = async ctx => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = await user.checkPassword(password);

    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();

    const token = user.generateToken();

    ctx.cookies.set('__dnkdream_blog_auth__', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  } catch (err) {
    ctx.throw(500, err);
  }
};

// 로그아웃
export const logout = async ctx => {
  ctx.cookies.set('__dnkdream_blog_auth__');
  ctx.status = 204;
};

// 접속 사용자 체크
export const check = async ctx => {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.body = user;
};
