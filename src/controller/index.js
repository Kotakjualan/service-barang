const Model  = require("../model/mongo/init")
const mongo = new Model.Mongo().setUri("mongodb://127.0.0.1:9876").setDatabase("KtUser").setCollection("user").build()

const moment = require('moment')

const loginController = async (param) => {
  if(param == null) return null
  const option = new Model.FindOption()
  option.setFilter(param)
  option.setProjection({email:1})
  const data = await mongo.findOne(option)  
  if(data == null) return null
  return data
}

const registerController = async (param) => {
  if(param == null) return false
  const option = new Model.SaveOption()
  const tmp = {
    ...param,
    createdAt : moment().format("YYYY-MM-DD"),
    asset : 0,    
  }
  option.setData(tmp)
  const res = await mongo.saveOne(option)
  return res
}

const getAssetController = async (param) => {
  if(param == null) return null
  const option = new Model.FindOption()
  option.setFilter(param)
  option.setProjection({asset:1})
  const data = await mongo.findOne(option)
  if(data == null) return null
  return data
}

const tarikAssetController = async (param) => {  
  if(param == null) return false
  const optionFind = new Model.FindOption()
  const optionUpdate = new Model.UpdateOption()
  optionFind.setFilter({email:param?.email})  
  const data = await mongo.findOne(optionFind)
  if(data == null) return false  
  if(data?.asset < param?.saldo) return false
  data.asset = data.asset - param.saldo
  optionUpdate.setFilter({email:param?.email})
  optionUpdate.setNewData(data)  
  const res = await mongo.updateOne(optionUpdate)
  return res  
}

const updateProfileController = async (param) => {
  if(param == null) return false
  const optionFind = new Model.FindOption()
  const optionUpdate = new Model.UpdateOption()
  optionFind.setFilter({email:param?.email})
  const data = await mongo.findOne(optionFind)  
  if(data == null) return false  
  data.name = param.name
  data.provinsi = param.provinsi
  data.kota = param.kota
  data.kecamatan = param.kecamatan
  data.foto = param.foto
  optionUpdate.setFilter({email:param.email})
  optionUpdate.setNewData(data) 
  const res = await mongo.updateOne(optionUpdate)
  return res
}

module.exports = {
  loginController, 
  registerController, 
  getAssetController, 
  tarikAssetController,
  updateProfileController
}

