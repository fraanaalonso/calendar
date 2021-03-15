const jwt = require('jsonwebtoken');

const generateJSONWebToken = ( uuid, name ) => {

    return  new Promise( (resolve, reject) => {
        const payload = { uuid, name };
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if( err ){
                console.log( err );
                reject('Cannot generate the token');

            }

            resolve( token );
        } )
    } )

}


module.exports = {
    generateJSONWebToken
}