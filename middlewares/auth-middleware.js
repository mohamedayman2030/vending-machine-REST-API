const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {User} = require('../configs/database.js');

exports.auth = async (req,res,next)=>{
    try{
    let token='';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(400).json({
            status: 'failed',
            message: 'you are not logged in, please login to get access'
        })
    }
    
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    // verify the existance of the user ( might not be existed)
    const existingUser = await User.findByPk(decoded.id);

    if(!existingUser){
        return res.status(400).json({
            status: 'failed',
            message: 'user with this token does not exist'
        })
    }
  
    req.user = existingUser;

   next();

}catch(err){
    console.error(err);
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid or expired token'
    });
}
}
