import { Schema, model } from "mongoose"
import Joi from "joi"

const blogSchema = new Schema({
    title: {
        type: String,
        required: false,
        default:"title 1"
    },
    desc: {
        type: String,
        required: false,
        default:"description 1"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

export const Blogs = model("blog", blogSchema)

export const validateBlog = (body)=>{
    const schema = Joi.object({
        title: Joi.string().allow("title 1"),
        desc: Joi.string().allow("description 1"),
        userId: Joi.string(),
    })
    return schema.validate(body)
}


