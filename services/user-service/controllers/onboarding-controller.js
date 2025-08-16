const {createUser} = require('./user-CRUD-controller.js');
const {createToken, isCorrectPassword} = require('../helpers/authHelpers.js');
const {User} = require('../../../configs/database.js');
const logger = require('../../../utils/logger.js');

exports.signUp = async (req,res)=>{
    const {username, password, role} = req.body;
    try{
    const createdUser = await createUser({
        username,
        password,
        role
    });
    
    if(createdUser.status==='SUCCESS'){
        const token = createToken(createdUser.message.id);
        res.status(201).json({
            status: 'success',
            message: 'created user successfully',
            token,
        })
        logger.info('User signedup', { username: username });
    }else if(createdUser.status==='EXIST'){
        res.status(409).json({
            status: 'success',
            message: 'already created user'
        });
    }

} catch(err){
     res.status(500).json({
        status: 'fail',
        message: 'cannot create user'
     })
     logger.error('Failed to create user', err);
}
}


exports.login = async (req,res)=>{
    try{
    if(!req.body.username || !req.body.password){
        return res.status(400).json({
            status: 'failed',
            message: 'please provide the username and the password'
        })
    }

    const username = req.body.username;

    const existingUser = await User.scope('withPassword').findOne({where:{username:username}})
    if(!existingUser){
        return res.status(400).json({
            status: 'failed',
            message: 'wrong username or password'
        })
    }
     
    const correctPassword = await isCorrectPassword(existingUser.password,req.body.password);
    if(!correctPassword){
       return res.status(400).json({
            status: 'failed',
            message: 'wrong email or password'
        })

    }
    const token = createToken(existingUser.id);

    return res.status(200).json({
        status: 'success',
        token
    })
    
        
    }catch(err){
        logger.error('Failed to create user', err);
        res.status(500).json({
            status: "error",
            message: "An error occurred while logging in",
        });
    }


}