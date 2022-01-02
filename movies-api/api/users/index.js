import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';
import passport from 'passport';

/**
 * @swagger 
 * definitions:
 *  user:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: User Name
 *     example: 'user1'
 *    email:
 *     type: string
 *     description: Email
 *     example: 'email@gmail.com'
 *    password:
 *     type: string
 *     description: password
 *     example: 'password12345'
 */

const router = express.Router(); // eslint-disable-line
/**
   * @swagger
   * /api/users:
   *  get:
   *   description: Get all registered Users
   *   responses:
   *     '200':
   *       description: Returning all available users
   *
   * 
   * 
   */
// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});


/**
   * @swagger
   * /api/users?action=register:
   *   post:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: body
   *        name: username
   *        type: string
   *        description: Registering
   *        schema:
   *          type: string
   *          required: 
   *            - username
   *          properties:
   *            username:
   *              type: string
   *              default: user123
   *            password:
   *              type: string
   *              default: password123
   *              minimum: 5
   *    responses:
   *      '201':
   *         description: 'Created'  
   *           
   *    
   *   
   *
   * 
   * 
   */

/**
   * @swagger
   * /api/users:
   *   post:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: body
   *        name: username
   *        type: string
   *        description: Registering
   *        schema:
   *          type: string
   *          required: 
   *            - username
   *          properties:
   *            username:
   *              type: string
   *              default: user1
   *            password:
   *              type: string
   *              default: test1
   *    responses:
   *      '201':
   *         description: 'Created'  
   *           
   *    
   *   
   *
   * 
   * 
   */

// register
router.post('/',asyncHandler( async (req, res, next) => {
    var regularExpression=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!req.body.username || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
    }
    if (req.query.action === 'register') {
        if(regularExpression.test(req.body.password)){
            await User.create(req.body).catch(next);
            res.status(201).json({code: 201, msg: 'Successful created new user.'  });   
        }else{
          res.status(401).json({success: false, msg: 'User Creation Failed. Please Try Again'});
        }
      
    } else {
      const user = await User.findByUserName(req.body.username).catch(next);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password matches, create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({success: true, token: 'BEARER ' + token});
          } else {
            res.status(401).json({code: 401,msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  }));

 // Update a user
 router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});
function hasDuplicates(array,id) {
  for(var i in array){
  if(array.includes(id,i)){
    return true;
  }
}return false;
}

/**
   * @swagger
   * /api/users/{userName}/favourites:
   *   post:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: path
   *        name: userName
   *        default: user1
   *      - in: body
   *        name: id
   *        type: string
   *        description: Adding Favourite
   *        schema:
   *          type: string
   *          required: 
   *            - id
   *          properties:
   *            id:
   *              type: string
   *              default: 590706
   *    responses:
   *      '201':
   *         description: 'Created'  
   *           
   *    
   *   
   *
   * 
   * 
   */

router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);

    if(!hasDuplicates(user.favourites,movie._id)){
    await user.favourites.push(movie._id);
    await user.save(); 
    res.status(201).json(user); 
    }else{
      res.status(404).json({ code: 404, msg: 'Unable to Add Favourite, Favourite Already Exists' });
    }
  }));
/**
   * @swagger
   * /api/users/{userName}/favourites:
   *   get:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: path
   *        name: userName
   *        type: string
   *        default: user1
   *        description: Getting Favourite
   *    responses:
   *      '201':
   *        description: Returning all Favourited movies for user
   *
   * 
   * 
   */
  router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favourites');
    
    res.status(201).json(user.favourites);
  }));

 
/**
   * @swagger
   * /api/users/{userName}/watchlist:
   *   post:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: path
   *        name: userName
   *        default: user1
   *      - in: body
   *        name: id
   *        type: string
   *        description: Adding To WatchList
   *        schema:
   *          type: string
   *          required: 
   *            - id
   *          properties:
   *            id:
   *              type: string
   *              default: 590706
   *    responses:
   *      '201':
   *         description: 'Created'  
   *           
   *    
   *   
   *
   * 
   * 
   */

router.post('/:userName/watchlist', asyncHandler(async (req, res) => {
    
  const newWatchlist = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newWatchlist);
  const user = await User.findByUserName(userName);
  if(!hasDuplicates(user.watchlist,movie._id)){
  await user.watchlist.push(movie._id);
  await user.save(); 
  res.status(201).json(user); 
  }else{
    res.status(404).json({ code: 404, msg: 'Unable to Add To WatchList, Movie Already Exists' });
  }
}));

/**
   * @swagger
   * /api/users/{userName}/watchlist:
   *   get:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: path
   *        name: userName
   *        type: string
   *        default: user1
   *        description: Getting Watchlist
   *    responses:
   *      '201':
   *        description: Returning all Watchlist movies for user
   *
   * 
   * 
   */
router.get('/:userName/watchlist', asyncHandler( async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName).populate('watchlist');
  res.status(201).json(user.watchlist);
}));

/**
   * @swagger
   * /api/users/{userName}/favourites:
   *   delete:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: path
   *        name: userName
   *        default: user1
   *      - in: body
   *        name: id
   *        type: string
   *        description: Deleting from Favourites
   *        schema:
   *          type: string
   *          required: 
   *            - id
   *          properties:
   *            id:
   *              type: string
   *              default: 590706
   *    responses:
   *      '201':
   *         description: 'Deleted'  
   *           
   *    
   *   
   *
   * 
   * 
   */

router.delete("/:userName/favourites",  asyncHandler(async (req, res) => {
  const unFav = req.body.id;
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  const movie = await movieModel.findByMovieDBId(unFav);
  await user.favourites.pop(movie._id);
  await user.save();
  if(!user.favourites.includes(movie._id)){
  res.status(201).json(user);
  }else{
    res.status(404).json({ code: 404, msg: 'Unable to Remove From Favourites' });
  }
  }));

  /**
   * @swagger
   * /api/users/{userName}/watchlist:
   *   delete:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: path
   *        name: userName
   *        default: user1
   *      - in: body
   *        name: id
   *        type: string
   *        description: Delete from WatchList
   *        schema:
   *          type: string
   *          required: 
   *            - id
   *          properties:
   *            id:
   *              type: string
   *              default: 590706
   *    responses:
   *      '201':
   *         description: 'Deleted'  
   *           
   *    
   *   
   *
   * 
   * 
   */

router.delete("/:userName/watchlist",  asyncHandler(async (req, res) => {
  const unWatch= req.body.id;
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  const movie = await movieModel.findByMovieDBId(unWatch);
  await user.watchlist.pop(movie._id);
  await user.save();
  if(!user.watchlist.includes(movie._id)){
  res.status(201).json(user);
  }else{
    res.status(404).json({ code: 404, msg: 'Unable to Remove From WatchList' });
  }
  }));


export default router;