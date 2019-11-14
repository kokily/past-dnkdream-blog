import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, register } from '../../lib/modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));
  const [error, setError] = useState(null);

  const onChange = e => {
    const { name, value } = e.target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;

    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요!');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다!');
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정입니다!');
        return;
      }
      setError('회원가입 에러!');
      return;
    }

    if (auth) {
      console.log('회원가입 성공!');
      console.log(auth);
      history.push('/login');
    }
  }, [auth, authError, history, dispatch]);

  return (
    <AuthForm
      mode="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterContainer;
