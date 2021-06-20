const Joi = require('joi')

const {validator} = require("../helper/response")

const schemaAddBarang = Joi.object().keys({
  email : Joi.string().email().required(),
  name : Joi.string().required(),
  desc : Joi.string().max(200).required(),
  price : Joi.number().required(),
  stock : Joi.number().required(),
  foto : Joi.any().required(),
  detail : Joi.object().optional()
})

const middleAddBarang = (req, res, next) => {
  const {error, value} = schemaAddBarang.validate(req?.body)
  validator(req, res, next, error, value)
}

const schemaEditBarang = Joi.object().keys({
  id : Joi.string().required(),
  name : Joi.string().required(),
  desc : Joi.string().max(200).required(),
  price : Joi.number().required(),
  stock : Joi.number().required(),
  foto : Joi.any().required(),
  detail : Joi.object().optional()
})

const middleEditBarang = (req, res, next) => {
  const {error, value} = schemaEditBarang.validate(req?.body)
  validator(req, res, next, error, value)
}

const schemaDeleteBarang = Joi.object().keys({
  id : Joi.string().required()
})

const middleDeleteBarang = (req, res, next) => {
  const {error, value} = schemaDeleteBarang.validate(req?.params)
  validator(req, res, next, error, value)
}

const schemaGetAllBarang = Joi.object().keys({
  email : Joi.string().email().required()
})

const middleGetAllBarang = (req, res, next) => {
  const {error, value} = schemaGetAllBarang.validate(req?.params)
  validator(req, res, next, error, value)
}

const schemaGetDetailBarang = Joi.object().keys({
  id : Joi.string().required()
})

const middleGetDetailBarang = (req, res, next) => {
  const {error, value} = schemaGetDetailBarang.validate(req?.params)
  validator(req, res, next, error, value)
}

module.exports = {middleAddBarang, middleEditBarang, middleDeleteBarang, middleGetAllBarang, middleGetDetailBarang}
