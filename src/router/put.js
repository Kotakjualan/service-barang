const express = require('express')
const router = express.Router()

const { sender } = require('../helper/response')
const { middleEditBarang } = require('../middleware/rule')
const { editBarangController } = require('../controller/index')
const { uploadFileLocal } = require('../middleware/uploader')
const { uploadCloud } = require('../helper/cloudinary')

router.put("/barang", uploadFileLocal, middleEditBarang, async (req, res)=>{  

  const resUploadCloud = await uploadCloud("./img/foto1")

  req.validated.foto = resUploadCloud?.secure_url

  const sta = await editBarangController(req?.validated)
  
  if(sta){
    sender(res, 200, "Update Barang Success")
    return
  }  
  sender(res, 500, "Update Barang Fail")
})

module.exports = router
