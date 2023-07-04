const router = require('express').Router();
const { checkRole } = require('../Auth/auth-middleware');
const User = require('./users-model');

router.get('/', (req,res)=>{
    res.json({message: "User'lar burada..."})
})

router.get('/orders', checkRole("Admin"), async (req,res,next)=>{
    const result = await User.getOrdersByUser();
    res.json(result);
})

module.exports = router;