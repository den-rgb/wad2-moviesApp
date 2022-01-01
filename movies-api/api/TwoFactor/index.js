import express from 'express';


const router = express.Router();
const speakeasy=require('speakeasy');

router.post("/totp-secret", (req,res,next)=>{
    var secretKey=speakeasy.generateSecret({length: 20});
    res.send({"secret":secretKey.base32,window:0});
  });
  
  router.post("/totp-generate",(req,res,next)=>{
    res.send({
      "speakToken":speakeasy.totp({
        secret: req.body.secret,
        encoding:"base32"
      }),
      "remaining": (30-Math.floor((new Date().getTime() / 1000.0 % 30)))
    });
  });
  
  router.post("/totp-validate",(req,res,next)=>{
    res.send({
      "valid":speakeasy.totp.verify({
        secret:req.body.secret,
        encoding:"base32",
        token:req.body.token,
        window:0
      })
    });
  });

  
export default router;