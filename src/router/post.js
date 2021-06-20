const express = require('express')
const router = express.Router()

const {middleLogin, middleRegister, middleTarikAsset} = require('../middleware/rule')
const {sender} = require("../helper/response");
const { registerController, tarikAssetController, loginController } = require('../controller');

router.post("/login", middleLogin, async (req, res)  => {  
  const sta = await loginController(req?.validated)
  if(sta != null){
    sender(res, 200, "Login Success", sta)
    return
  }  
  sender(res, 404, "User not found")
})

router.post("/register", middleRegister, async (req, res)=>{
  const sta = await registerController(req?.validated)
  if(sta){
    sender(res, 200, "Register Success")
    return
  }  
  sender(res, 500, "Register Fail")
})

router.post("/tarik/asset", middleTarikAsset, async (req, res)=>{
  const sta = await tarikAssetController(req?.validated)
  if(sta){
    sender(res, 200, "Tarik Asset Success")
    return
  }  
  sender(res, 500, "Tarik Asset Fail")
})

module.exports = router