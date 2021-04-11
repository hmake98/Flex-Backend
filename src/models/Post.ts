import {
  model, Schema, Model, Document, Types,
} from 'mongoose';

export interface IPost extends Document {
    _id: string;
    title: string;
    content: string;
    images: string[];
    isPublic: boolean;
    createdBy: object;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: { type: Array, required: true },
  isPublic: { type: Boolean, required: true },
  createdBy: { type: Types.ObjectId, ref: 'users' },
}, {
  timestamps: true,
});

export const Post: Model<IPost> = model('posts', PostSchema);
