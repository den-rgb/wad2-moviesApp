import express from 'express';

/**
 * @swagger 
 * definitions:
 *  code:
 *   type: object
 *   properties:
 *    secret:
 *     type: string
 *     description: secret key
 *     example: 'MYSGWZZEG42EGYR3GRDCUVKYK5KUIUR4'
 *    speakToken:
 *     type: string
 *     description: code
 *     example: '123456'
 *    
 */

const router = express.Router();
const speakeasy=require('speakeasy');

/**
   * @swagger
   * /api/code/totp-secret:
   *   post:
   *    consumes:
   *      - application/json
   *    description: Get secret key
   *    responses:
   *      '201':
   *         description: 'Generated'  
   *           
   */
router.post("/totp-secret", (req,res,next)=>{
    var secretKey=speakeasy.generateSecret({length: 20});
    res.send({"secret":secretKey.base32,window:0});
  });
  /**
   * @swagger
   * /api/code/totp-generate:
   *   post:
   *    consumes:
   *      - application/json
   *    description: Get code
   *    responses:
   *      '201':
   *         description: 'Generate'  
   *           
   */
  router.post("/totp-generate",(req,res,next)=>{
    res.send({
      "speakToken":speakeasy.totp({
        secret: req.body.secret,
        encoding:"base32"
      }),
      "remaining": (30-Math.floor((new Date().getTime() / 1000.0 % 30)))
    });
  });
  /**
   * @swagger
   * /api/code/totp-validate:
   *   post:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: body
   *        name: token
   *        type: string
   *        description: Validating code
   *        schema:
   *          type: string
   *          required: 
   *            - secret
   *          properties:
   *            secret:
   *              type: string
   *              default: KBFHG3TSFRPFIRTMIAYHGQRMH5IVOJB6
   *            token:
   *              type: string
   *    responses:
   *      '201':
   *         description: 'Validate'  
   *           
   *    
   *   
   *
   * 
   * 
   */
  
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