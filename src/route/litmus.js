const express = require('express');
let router = express.Router();
const controller = require('../controller/litmus.js');
const { authentication, authorization_user } = require('../auth.js/litmus.js');

// -----------------------user APIs
router.post('/register', controller.createUser)
router.post('/login', controller.login)
router.put('/profile', authentication, authorization_user, controller.update)
router.delete('/deleteUser', authentication, authorization_user, controller.deleteUserById)
router.get('/getUser', authentication, authorization_user, controller.getUser)

// validation of path url
router.all('/:y/', (req, res)=>res.status(400).send({status:false,message:"pls correct your path param value"}));
router.all('/:y/:x', (req, res)=>res.status(400).send({status:false,message:"pls correct your path param value"}));

router.get('/',function(req, res){
    res.send('<html><body><h1 style="background-color:Tomato;" >NODE server is running</h1></body></html>')
});
module.exports = router;