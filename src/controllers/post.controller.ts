import { Request, Response } from 'express';
import { Post } from 'src/models/Post';
import logger from 'src/services/logger.service';
import { POST } from 'src/utils/messages';
import { Responses } from '../utils/Response';

export class PostController extends Responses {
  public getPosts = async (req: Request, res: Response) => {
    try {
      const {
        skip,
        limit,
        id,
      } = req.query;

      const posts = await Post.aggregate([
        {
          $match: {
            id
          }
        },
        { $limit: +skip + +limit },
        { $skip: +skip },
      ])

      this.success(res, { posts });
    } catch (err) {
      logger.error('[createPost]: err');
    }
  }

  public createPost = async (req: Request, res: Response) => {
    try {
      const {
        title,
        content,
        images,
        isPublic = true,
      } = req.body;

      const create_post = {
        title,
        content,
        images,
        isPublic,
      };

      const post = new Post(create_post).save();

      this.success(res, { post });
    } catch (err) {
      logger.error('[createPost]: err');
    }
  }

  public editPost = async (req: Request, res: Response) => {
    try {
      const {
        title,
        content,
        images,
        isPublic = true,
        id
      } = req.body;

      const updatePost = {
        title,
        content,
        images,
        isPublic,
      };

      const update_post = await Post.findByIdAndUpdate(
        id,
        updatePost
      )

      this.success(res, { post: update_post });
    } catch (err) {
      logger.error('[createPost]: err');
    }
  }

  public deletePost = async (req: Request, res: Response) => {
    try {
      const {
        id
      } = req.query;
      await Post.findByIdAndRemove(id)
      this.success(res, { message: POST.DELETED });
    } catch (err) {
      logger.error('[createPost]: err');
    }
  }
}
