import React from 'react';
import Modal from '../common/Modal';

const PostModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      title="포스트 삭제"
      content="이 포스트를 삭제하시겠습니까?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default PostModal;
