const Model  = require("../model/mongo/init")
const mongo = new Model.Mongo().setUri("mongodb://127.0.0.1:9876").setDatabase("KtBarang").setCollection("barang").build()

const moment = require('moment')
const { ObjectID } = require("mongodb")

const addBarangController = async (param) => {
  if(param == null) return false
  const optionSave = new Model.SaveOption()
  const tmp = {
    ...param,
    createdAt : moment().format("YYYY-MM-DD")
  }
  optionSave.setData(tmp)  
  const res = await mongo.saveOne(optionSave)
  return res
}

const getAllBarangController = async param => {
  if(param == null) return []  
  const option = new Model.FindOption()
  option.setFilter({email:param?.email})
  const data = await mongo.findAll(option)
  if(data == null) return null
  return data
}

const getDetailBarangController = async param => {
  if(param == null) return null
  const option = new Model.FindOption()
  option.setFilter({_id:new ObjectID(param?.id)})
  const data = await mongo.findOne(option)
  if(data == null) return null
  return data
}

const editBarangController = async param => {
  if(param == null) return false
  const option = new Model.UpdateOption()
  option.setFilter({_id:new ObjectID(param?.id)})
  const tmp = {
    name:param?.name,
    desc:param?.desc,
    price:param?.price,
    stock:param?.stock,
    foto:param?.foto,
    detail:param?.detail
  } 
  option.setNewData(tmp)
  const res = await mongo.updateOne(option)
  return res
}

const deleteBarangController = async param => {
  if(param == null) return false
  const option = new Model.DeleteOption()
  option.setFilter({_id:new ObjectID(param?.id)})
  const res = await mongo.deleteOne(option)
  return res
}

module.exports = {
  addBarangController,
  getAllBarangController,
  getDetailBarangController,
  editBarangController,
  deleteBarangController
}

