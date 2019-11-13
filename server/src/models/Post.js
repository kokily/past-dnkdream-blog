import mongoose from 'mongoose';

const Post = new mongoose.model({
  title: String,
  body: String,
  tags: [String],
  thumbnail: String,
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

export default mongoose.model('Post', Post);
