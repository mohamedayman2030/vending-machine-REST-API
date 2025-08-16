const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

exports.hashedPassword= async (password)=>{
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS));
    return hashedPassword;
}


exports.createToken = (id)=>{
    const token = jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY});

    return token;
}

exports.isCorrectPassword = async(DBpassword,userPassword)=>{
    return await bcrypt.compare(userPassword,DBpassword);
}