const router = require('express').Router();
const User = require('./users-model');

router.get('/', (req,res)=>{
    res.json({message: "User'lar burada..."})
})

router.get('/orders', async (req,res,next)=>{
    const result = await User.getOrdersByUser();
    res.json(result);
})

module.exports = router;