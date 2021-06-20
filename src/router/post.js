const express = require('express')
const router = express.Router()

const { sender } = require("../helper/response");
const { addBarangController } = require('../controller');
const { middleAddBarang } = require('../middleware/rule');

router.post("/barang", middleAddBarang, async (req, res)  => {  
  const sta = await addBarangController(req?.validated)
  if(sta){
    sender(res, 200, "Tambah Barang Success")
    return
  }  
  sender(res, 404, "Tambah Barang")
})

module.exports = router