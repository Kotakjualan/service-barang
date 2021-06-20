const sender = (res,status,message,data) => {
  status = (status||200)
  message = (message||"")
  data = (data||{})
  const ob = {
    code : status,
    message : message,
    data : data
  }  
  res.status(status).json(ob)
}

const validator = (req, res, next, error, value) => {
  if(error != null){
    sender(res, 400, "Something wrong with you request",error?.details[0]?.message)
    return
  }
  else{
    req.validated = value
    next()
  }
}

module.exports = {sender, validator}