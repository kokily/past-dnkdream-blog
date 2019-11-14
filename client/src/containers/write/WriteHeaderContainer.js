import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { writePost, updatePost, changeField } from '../../lib/modules/write';
import WriteHeader from '../../components/write/WriteHeader';

const WriteHeaderContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, thumbnail, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      thumbnail: write.thumbnail,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
  );

  const onBack = () => {
    history.goBack();
  };

  const onUpload = () => {
    const upload = document.createElement('input');

    upload.type = 'file';
    upload.onchange = e => {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      return axios
        .post('/api/upload', formData)
        .then(res => {
          const oldBody = body;
          const newBody = `${oldBody}![image](/uploads/${res.data})`;
          let newThumbnail = `/uploads/${res.data}`;

          if (!thumbnail) {
            dispatch(changeField({ key: 'thumbnail', value: newThumbnail }));
          }

          dispatch(changeField({ key: 'body', value: newBody }));
        })
        .catch(err => console.log(err));
    };
    upload.click();
  };

  const onSubmit = () => {
    if (originalPostId) {
      if (thumbnail) {
        dispatch(updatePost({ title, body, tags, thumbnail, id: originalPostId }));
      } else {
        dispatch(updatePost({ title, body, tags, id: originalPostId }));
      }
      return;
    }

    if (thumbnail) {
      dispatch(writePost({ title, body, tags, thumbnail }));
    } else {
      dispatch(writePost({ title, body, tags }));
    }
  };

  useEffect(() => {
    if (post) {
      const { _id } = post;
      history.push(`/post/${_id}`);
    }

    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return <WriteHeader onBack={onBack} onUpload={onUpload} onSubmit={onSubmit} />;
};

export default withRouter(WriteHeaderContainer);
