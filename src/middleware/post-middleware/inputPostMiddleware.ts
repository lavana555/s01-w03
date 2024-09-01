import Joi from "joi";
import {NextFunction, Request, Response} from "express";
import {blogsRepository} from "../../db/blog-repository";

export const inputPostMiddleware = (schema: Joi.ObjectSchema, source: 'body' | 'params' | 'query' = 'body') => {
    const resStatus = source === 'params' ? 404 : 400;

    return async (req: Request, res: Response, next: NextFunction) => {
        const { title, shortDescription, content, blogId } = req.body;
        const validateParams = source === 'body' ? { title, shortDescription, content, blogId } : req[source];
        const { error } = schema.validate(validateParams, { abortEarly: false });

        if(error) {
            const validationErrors = error.details.map(err=>({
                message:err.message || null,
                field:err.path[0] || null,
            }))
            const findBlog = await blogsRepository.find(blogId)
            console.log("findBlog", findBlog);
            if (!findBlog) {
                console.log("if");
                validationErrors.push({
                    message: 'Blog not found',
                    field: 'blogId',
                });
            }
            return res.status(400).json({
                errorsMessages: validationErrors,
            });
        }

       return next();  // Add this line
    };
};
