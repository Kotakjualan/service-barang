const express = require('express')
const { deleteBarangController } = require('../controller')
const router = express.Router()

const { sender } = require("../helper/response")
const { middleDeleteBarang } = require('../middleware/rule')

router.delete("/barang/:id", middleDeleteBarang, async (req, res)=>{
  const sta = await deleteBarangController(req?.validated)
  if(sta){
    sender(res, 200,`Barang dengan id ${req?.params?.id} berhasil dihapus`)
    return
  }
  sender(res, 500, "Barang gagal di hapus")
})

module.exports = router