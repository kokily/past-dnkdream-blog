import React from 'react';
import Intro from '../../components/home/Intro';

const introData = {
  img: 'images/profile.jpg',
  username: 'KOKILY',
  content: '저는 개발자가 아니지만 자바스크립트를 좋아하여 열심히 공부하는 직장인입니다.',
  skill: ['Node JS', 'React JS', 'Next JS'],
};

const IntroContainer = () => {
  const onGithub = () => {
    document.location.href = 'https://github.com/kokily';
  };

  return (
    <Intro
      img={introData.img}
      username={introData.username}
      content={introData.content}
      skill={introData.skill}
      onGithub={onGithub}
    />
  );
};

export default IntroContainer;
