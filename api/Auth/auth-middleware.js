const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config');

function isTokenCached(req,res,next){
    const isCached = true; ;//cache controlü eklenecek.
    if(isCached){
        next()
    } else {
        next({status: 401, message: 'Geçersiz giriş!...'})
    }
}

function protected(req,res,next){
    
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,JWT_SECRET, (err,decodedJWT)=>{
            if(err){
                next({status: 401, message: err.message})
            } else {
                req.decodedJWT = decodedJWT
                next()
            }
        })

    } else {
        next({status: 401, message: 'Token yok!...'})
    }
    
}

function onlyAdmins(req,res,next){
    if(req.decodedJWT && req.decodedJWT.Role === "Admin") {
        next()
    } else {
        next({status: 403, message: "Burası için yetkiniz yok!.."})
    }
}

const checkRole = (role) => (req,res,next)=>{
    if(req.decodedJWT && req.decodedJWT.Role === role) {
        next()
    } else {
        next({status: 403, message: "Burası için yetkiniz yok!.."})
    }
}

module.exports = {
    isTokenCached,
    protected,
    onlyAdmins,
    checkRole,
}