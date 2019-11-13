import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../lib/modules/auth';
import Aside from '../../components/common/Aside';

const AsideContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));
  const [toggle, setToggle] = useState(false);

  const onBrand = () => {
    history.push('/');
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const onWrite = () => {
    history.push('/write');
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Aside
      user={user}
      toggle={toggle}
      onBrand={onBrand}
      onToggle={onToggle}
      onWrite={onWrite}
      onLogout={onLogout}
    />
  );
};

export default withRouter(AsideContainer);
