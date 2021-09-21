const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJSONWebToken} = require('../helpers/jwt')
const jwt = require('jsonwebtoken');


const createUser = async(req, resp = response) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email: email});
        if( user ){
            resp.status(400).json({
                ok: false,
                msg: 'The user already exists'
            });
        }
        user = new User( req.body );

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        await user.save();

        const token = await generateJSONWebToken(user.id, user.name);

        resp.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    }catch(error){
        resp.status(500).json({
            ok: false,
            msg: 'Please, contact the administrator'
        })
    }
    
}


const loginUser = async(req, resp = response) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.findOne({ email});
        if( !user ){
            resp.status(400).json({
                ok: false,
                msg: 'Email does not exists'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return resp.status(400).json({
                ok: false,
                msg: 'Password is not correct'
            })
        }

        //Generate Token, When a user is authenticated
        const token = await generateJSONWebToken(user.id, user.name);

        resp.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    }catch( error ){
        resp.status(500).json({
            ok: false,
            msg: 'Please, contact the administrator'
        })
    }
}


const renewToken = async(req, resp = response) => {

    const {uuid, name} = req;
    const token = await generateJSONWebToken(uuid, name);
    resp.json({

        ok: true,
        token,
        uid: uuid,
        name
    })
}



module.exports = {
    createUser,
    loginUser,
    renewToken
}