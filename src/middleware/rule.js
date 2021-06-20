const Joi = require('joi')

const {validator} = require("../helper/response")

const schemaLogin = Joi.object().keys({
  email : Joi.string().email().required(),
  password : Joi.string().min(8).required()
})

const middleLogin = (req, res, next) => {
  const {error, value} = schemaLogin.validate(req?.body)
  validator(req, res, next, error, value)
}

const schemaRegister = Joi.object().keys({
  name : Joi.string().required(),
  email : Joi.string().email().required(),
  password : Joi.string().min(8).required(),
  password_confirmation : Joi.string().min(8).required()
})

const middleRegister = (req, res, next) => {
  const {error, value} = schemaRegister.validate(req?.body)
  validator(req, res, next, error, value)
}

const schemaGetAsset = Joi.object().keys({
  email : Joi.string().email().required(),  
})

const middleGetAsset = (req, res, next) => {
  const {error, value} = schemaGetAsset.validate(req?.params)
  validator(req, res, next, error, value)
}

const schemaTarikAsset = Joi.object().keys({
  email : Joi.string().email().required(),  
  saldo : Joi.number().required()
})

const middleTarikAsset = (req, res, next) => {
  const {error, value} = schemaTarikAsset.validate(req?.body)
  validator(req, res, next, error, value)
}

const schemaEditProfile = Joi.object().keys({
  email : Joi.string().email().required(),  
  name : Joi.string().required(),
  provinsi : Joi.string().optional(),
  kota : Joi.string().optional(),
  kecamatan : Joi.string().optional(),
  foto : Joi.any().optional()
})

const middleEditProfile = (req, res, next) => {    
  const {error, value} = schemaEditProfile.validate(req?.body)
  validator(req, res, next, error, value)
}

module.exports = {middleLogin, middleRegister, middleGetAsset, middleTarikAsset, middleEditProfile}
