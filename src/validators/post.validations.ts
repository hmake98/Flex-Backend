import { body } from 'express-validator';
import { VALIDATION } from '../utils/messages';

// alawys sanitizatize the input use trim and escape every for each input.
const createPost = [
    body('title').trim().escape().isAlpha().optional(),
    body('body').trim().escape().isAlpha().optional(),
    body('images').trim().escape().isArray().optional(),
    body('isPublic').trim().escape().isBoolean().optional(),
]

const editPost = [
    body('id').trim().escape().isAlpha(),
    body('title').trim().escape().isAlpha().optional(),
    body('body').trim().escape().isAlpha().optional(),
    body('images').trim().escape().isArray().optional(),
    body('isPublic').trim().escape().isBoolean().optional(),
]

const deletePost = [
    body('id').trim().escape().isAlpha(),
    body('title').trim().escape().isAlpha().optional(),
    body('body').trim().escape().isAlpha().optional(),
    body('images').trim().escape().isArray().optional(),
    body('isPublic').trim().escape().isBoolean().optional(),
]

const getPost = [
    body('id').trim().escape().isAlpha(),
    body('title').trim().escape().isAlpha().optional(),
    body('body').trim().escape().isAlpha().optional(),
    body('images').trim().escape().isArray().optional(),
    body('isPublic').trim().escape().isBoolean().optional(),
]

const getPosts = [
    body('id').trim().escape().isAlpha(),
    body('title').trim().escape().isAlpha().optional(),
    body('body').trim().escape().isAlpha().optional(),
    body('images').trim().escape().isArray().optional(),
    body('isPublic').trim().escape().isBoolean().optional(),
]

export default {
    createPost,
    editPost,
    deletePost,
    getPosts,
    getPost
}