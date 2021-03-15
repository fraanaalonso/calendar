const {response} = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req, resp=response, next) => {

    //x-toke headers

    const token = req.header('x-token');
    if( !token ){
        return resp.status(401).json({
            ok: false,
            msg: 'There is no token'
        })
    }

    try{
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uuid = payload.uuid
        req.name = payload.name;

    }catch( error ){
        return resp.status(401).json({
            ok: false,
            msg: 'Token not valid'
        })
    }
    

    next();
}


module.exports = {
    validateJWT
}