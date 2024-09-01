import {config} from 'dotenv';
config()


export const SETTINGS = {
        PORT: process.env.PORT || 5002,
        PATH: {
            TESTING:'/testing/all-data',
            BLOGS:'/blogs',
            POSTS:'/posts',

        }
}

export const ADMIN_AUTH = 'admin:qwerty'
