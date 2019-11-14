import React from 'react';
import { useSelector } from 'react-redux';
import WritePreview from '../../components/write/WritePreview';

const WritePreviewContainer = () => {
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  return <WritePreview title={title} body={body} />;
};

export default WritePreviewContainer;
