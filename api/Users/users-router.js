const router = require('express').Router();

router.get('/', (req,res)=>{
    res.json({message: "User'lar burada..."})
})

module.exports = router;