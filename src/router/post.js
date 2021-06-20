const express = require('express')
const router = express.Router()

const { sender } = require("../helper/response");
const { addBarangController } = require('../controller');
const { middleAddBarang } = require('../middleware/rule');
const { uploadFileLocal } = require('../middleware/uploader');
const { uploadCloud } = require('../helper/cloudinary');

router.post("/barang", uploadFileLocal,middleAddBarang, async (req, res)  => {  
  const resUploadCloud = await uploadCloud("./img/foto1")  
  req.validated.foto = resUploadCloud?.secure_url  
  const sta = await addBarangController(req?.validated)
  if(sta){
    sender(res, 200, "Tambah Barang Success")
    return
  }  
  sender(res, 404, "Tambah Barang Gagal")
})

module.exports = router