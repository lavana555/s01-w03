import {db} from "../db/db";
import {Request, Response} from 'express'
import {blogsRepository} from "../db/blog-db-repository";



export const getBlogsController = async (req: Request, res: Response<any>) => {

    const blogs = await blogsRepository.getAllBlogs()

    res
        .status(200)
        .json(blogs) // отдаём видео в качестве ответа

}
