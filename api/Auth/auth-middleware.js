function protected(req,res,next){
    if(req.session && req.session.user) {
        next()
    } else {
        next({status: 401, message: 'Önce login olunuz!...'})
    }
}

module.exports = {
    protected,
}