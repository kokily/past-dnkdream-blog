import React from 'react';
import WriteTemplate from '../components/write/WriteTemplate';
import WriteHeaderContainer from '../containers/write/WriteHeaderContainer';
import WriteBodyContainer from '../containers/write/WriteBodyContainer';
import WritePreviewContainer from '../containers/write/WritePreviewContainer';

const WritePage = () => {
  return (
    <WriteTemplate
      header={<WriteHeaderContainer />}
      content={<WriteBodyContainer />}
      preview={<WritePreviewContainer />}
    />
  );
};

export default WritePage;
