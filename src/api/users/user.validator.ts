import * as Joi from  "joi"

export const createUserModel = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required()
});

export const updateUserModel = Joi.object().keys({
    email: Joi.string().email().trim(),
    password: Joi.string().trim()
});

export const loginUserModel = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
});

export const jwtValidator = Joi.object({'authorization': Joi.string().required()}).unknown();
