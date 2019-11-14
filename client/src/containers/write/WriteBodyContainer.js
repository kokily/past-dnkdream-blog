import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialize, changeField } from '../../lib/modules/write';
import WriteBody from '../../components/write/WriteBody';
import WriteTagBox from '../../components/write/WriteTagBox';

const WriteBodyContainer = () => {
  const dispatch = useDispatch();
  const { title, body, tags } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
  }));

  const onChangeField = useCallback(
    payload => {
      dispatch(changeField(payload));
    },
    [dispatch],
  );

  const onChangeTags = nextTags => {
    dispatch(changeField({ key: 'tags', value: nextTags }));
  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <WriteBody
      title={title}
      body={body}
      onChangeField={onChangeField}
      onChangeTags={onChangeTags}
    >
      <WriteTagBox tags={tags} onChangeTags={onChangeTags} />
    </WriteBody>
  );
};

export default WriteBodyContainer;
