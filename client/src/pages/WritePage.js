import React from 'react';
import WriteTemplate from '../components/write/WriteTemplate';
import WriteHeader from '../components/write/WriteHeader';
import WriteBody from '../components/write/WriteBody';
import WritePreview from '../components/write/WritePreview';

const WritePage = () => {
  return (
    <WriteTemplate
      header={<WriteHeader />}
      content={<WriteBody />}
      preview={<WritePreview />}
    />
  );
};

export default WritePage;
