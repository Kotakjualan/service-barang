const express = require('express')
const router = express.Router()

const { sender } = require('../helper/response')
const { middleEditProfile } = require('../middleware/rule')
const { updateProfileController } = require('../controller/index')
const { uploadFileLocal } = require('../middleware/uploader')
const { uploadCloud } = require('../helper/cloudinary')

router.put("/profile", uploadFileLocal, middleEditProfile, async (req, res)=>{  

  const resUploadCloud = await uploadCloud("./img/foto1")

  req.validated.foto = resUploadCloud?.secure_url

  const sta = await updateProfileController(req?.validated)
  
  if(sta){
    sender(res, 200, "Update Profile Success")
    return
  }  
  sender(res, 500, "Update Profile Fail")
})

module.exports = router
