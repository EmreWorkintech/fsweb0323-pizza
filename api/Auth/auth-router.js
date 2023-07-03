const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../Users/users-model');

router.post('/register', async (req,res,next)=>{
    const user = req.body;
    user.Password = bcrypt.hashSync(user.Password, 8);  // 2 üzeri 8 defa hashleyecek.
    const newUser = await User.create(user);
    if(newUser) {
        res.json({message: `Merhaba ${newUser.Name}, aramıza hoş geldin...`})
    } else {
        res.status(500).json({message: "Kullanıcı kaydında sorun oluştu..."})
    }
})

router.post('/login', async (req,res,next)=>{
    const { Password, Email } = req.body;
    // adım 1: önce kişiyi veritabanından alırız.
    const user = await User.getByFilter({Email: Email}).first();
    //adım 2: password'unu check ederiz.
    if(user && bcrypt.compareSync(Password, user.Password)){
        req.session.user = user;  //Session oluşturduk.
        res.json({message: `Merhaba ${user.Name}, tekrar hoş geldin...`})
    } else {
        res.status(401).json({message: `Giriş bilgileri yanlış...`})
    }
    
})

router.post('/password/reset', async (req,res,next)=>{
    res.json({message: "password"})
})

router.get('/logout', async (req,res,next)=>{
    if(req.session && req.session.user){
        const { Name } = req.session.user;
        req.session.destroy(err=>{  //server tarafında session'ı destroy eder.
            if(err){
                res.status(500).json({message: "Session error!..."})
            } else {
                res.set('Set-Cookie', 'PizzaOrder=; Path=/; Expires=Mon, 01 Jan 1970 11:33:31 GMT') //1.Client tarfında Cookie expire olsun diye geçmiş tarih verdim.
                res.json({message: `${Name}, Tekrar bekleriz...`}) //2. success mesajı döndük
            }
        })

    } else {
        res.status(400).json({message: "Zaten session'ın yok. Hiç login olmamış olabilir misin :)"})
    }
    
})

module.exports = router;