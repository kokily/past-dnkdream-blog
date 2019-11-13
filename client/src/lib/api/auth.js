import client from './client';

// 회원가입 - 나중에 미사용 적용(혼자만의 블로그 이기 때문)
export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

// 로컬 로그인 - 나중에 소셜 로그인 구현 해볼 예정
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

// 로그아웃
export const logout = () => client.post('/api/auth/logout');

// 접속 사용자 체크
export const check = () => client.get('/api/auth/check');
