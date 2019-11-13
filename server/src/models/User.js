import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = new mongoose.Schema({
  username: String,
  hashedPassword: String,
});

// 모델 Methods -> this는 모델을 가리킴
// 비밀번호 해싱 처리 함수 model.setPassword(password)
User.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

// 비밀번호 확인 함수 model.checkPassword(password) -> 반환값 boolean
User.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// 모델 내 비밀번호 삭제
User.methods.serialize = function() {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

// JWT 토큰 발행함수
User.methods.generateToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

// 모델 Statics -> this 는 함수를 가리킴
User.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

export default mongoose.model('User', User);
