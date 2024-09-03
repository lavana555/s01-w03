import { Request, Response } from 'express';
import { PostTypes } from "../db/post-types";
import {postsRepository} from "../db/post-db-repository";



export const createPostController = async (req: Request, res: Response) => {
    const { title, shortDescription, content, blogId } = req.body;

    const post: PostTypes = {
        shortDescription: shortDescription,
        content: content,
        title: title,
        blogId: blogId,
        blogName: "",
        createdAt: new Date().toISOString(),
    };

    const result = await postsRepository.create(post);

    if (result.error) {
        if (result.error === 'Blog not found') {
            return res.status(404).json({
                errorsMessages: [
                    {
                        message: result.error,
                        field: "blogId",
                    }
                ]
            });
        }
        return res.status(500).json({ error: result.error });
    }

    return res.status(201).json(result.post);
};
