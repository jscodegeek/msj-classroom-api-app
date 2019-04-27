import * as Joi from 'joi';

export const id = Joi.number()
	.integer()
	.min(1)
	.required();

export const name = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();

export const pincode = Joi.number()
	.integer()
	.min(1)
	.required();

export const status = Joi.string()
	.max(20)
	.trim()
	.min(1)
	.required();

export const description = Joi.string()
	.max(10000)
	.min(1)
	.required();

export const date = Joi.date().required();

export const imageUrl = Joi.string()
	.max(10000)
	.min(1)
	.required();

export const author = Joi.string()
	.max(100)
	.trim()
	.min(1)
	.required();

export const text = Joi.string()
	.max(10000)
	.min(1)
	.required();

export const type = Joi.string()
	.max(20)
	.trim()
	.min(1)
	.required();

export const firstname = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();

export const lastname = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();

export const login = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();

export const password = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();

export const authToken = Joi.string()
	.max(2000)
	.trim()
	.min(1)
	.required();

export const subscribable = Joi.string()
	.max(200)
	.trim()
	.min(1)
	.required();
