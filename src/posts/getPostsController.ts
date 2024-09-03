import {Request, Response} from 'express'
import {postsRepository} from "../db/post-db-repository";



export const getPostsController = async (req:Request, res:Response) => {
    const posts = await postsRepository.getAllPosts();
    return res.status(200).json(posts);
}
