const express = require("express")
const { getAllBarangController, getDetailBarangController } = require("../controller")
const router = express.Router()

const { sender } = require("../helper/response")
const { middleGetAllBarang, middleGetDetailBarang } = require("../middleware/rule")

router.get("/barang/all/:email", middleGetAllBarang, async (req, res)=>{
  const sta = await getAllBarangController(req?.validated)
  if(sta != null){
    sender(res, 200, "Barang ditemukan", sta)
    return
  }
  sender(res, 404, "Barang tidak ditemukan")
})

router.get("/barang/detail/:id", middleGetDetailBarang, async (req, res)=>{
  const sta = await getDetailBarangController(req?.validated)
  if(sta != null){
    sender(res, 200, "Barang ditemukan", sta)
    return
  }
  sender(res, 404, "Barang tidak ditemukan")
})

module.exports = router