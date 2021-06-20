const express = require("express")
const { getAssetController } = require("../controller")
const router = express.Router()

const { sender } = require("../helper/response")
const { middleGetAsset } = require("../middleware/rule")

router.get("/asset/:email", middleGetAsset, async (req, res)=>{
  const sta = await getAssetController(req?.validated)
  if(sta != null){
    sender(res, 200, "Asset berhasil ditemukan", sta)
    return
  }  
  sender(res, 404, "Asset tidak ditemukan")
})

module.exports = router