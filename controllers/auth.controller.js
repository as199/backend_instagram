const doctrine = require('../services/doctrine');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
require('dotenv').config();

const tableName = 'users';
module.exports = {
    login: function(req, res, next) {
        doctrine.connect(tableName, req.body.username, async function (err, users) {
            if (err) {
                res.status(401).json({message: 'invalid credentials'});
            }
            else{
                if(users === undefined){
                    res.status(401).json({message: 'invalid credentials'});
                }else{
                    if(users.status === 0){
                        res.status(401).json({message: 'votre compte est désactivé.Veuillez contacter l\'administrateur'});
                    }
                    else{
                        const validPassword = await bcrypt.compare(req.body.password, users.password);
                        if (validPassword) {
                            const token = jwt.sign(
                                {
                                    id: users.id,
                                    firstName: users.firstName,
                                    lastName: users.lastName,
                                    roles: users.roles
                                },
                                process.env.ACCESS_TOKEN_SECRET,
                                {expiresIn: '70h'}
                            );
                            res.status(200).json({message: 'login successfully', accessToken: token});
                        } else {
                            res.status(401).json({message: 'invalid credentials'});
                        }
                    }
                }

            }
        });
    },
    register : async function (req, res, next) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let user = new User(req.body);
        doctrine.add(tableName, user, function (err, user) {
            if (err) {
                res.status(500).json({message: 'Error when creating user'});
            }
            res.status(201).json({message: 'User created', data: user});
        });
    }
}