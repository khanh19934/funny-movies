import * as Joi from "joi"

export const shareVideo = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    videoURL: Joi.string().required()
})