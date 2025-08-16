exports.restricedTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                 status: 'fail',
                 message: 'user not allowed'
            })
        }
        next();
    }
}