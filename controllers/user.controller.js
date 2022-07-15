const User = require('../models/user.model');
const doctrine = require('../services/doctrine');
const moment = require("moment");
const bcrypt = require('bcrypt');

moment.locale('fr');
const tableName = 'users';
module.exports = {
    getAllUsers : function(req, res, next) {
        doctrine.findAll([tableName, 1], function(err, users) {
            if (err) {
                res.status(500).json({message: 'Error when getting users'});
            }
            res.status(200).json(hydrate(users));
        });
    },
    getUserById : function(req, res, next) {
        doctrine.find(tableName, req.decoded.id, function(err, user) {
            if (err) {
                res.status(500).json({message: 'Error when getting user'});
            }
            user.password = null;
            user.created_at = moment(user.created_at).format('LLLL')
            res.status(200).json(user);
        });
    },
    createUser : async function (req, res, next) {
        if (req.file) {
            req.body.avatar = '/images/' + req.file.filename;
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let user = new User(req.body);
        doctrine.add(tableName, user, function (err, user) {
            if (err) {
                res.status(500).json({message: 'Error when creating user'});
            }
            res.status(201).json({message: 'User created', data: user});
        });
    },
    updateUser : async function (req, res, next) {
        if (req.file) {
            req.body.avatar = '/images/' + req.file.filename;
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        let user = req.body;
        if (req.params.userId) {
            doctrine.update(tableName, [user, req.params.userId], function (err, user) {
                if (err) {
                    res.status(500).json({message: 'Error when updating user'});
                }
                res.status(200).json({message: 'User updated', data: user});
            });
        } else {
            res.status(500).json({message: 'Not found user id'});
        }

    },
    deleteUser: function(req, res, next) {
        doctrine.find(tableName, req.params.userId, function(err, user) {
            if (err) {
                res.status(500).json({message: 'Not found user id'});
            }
            else{
                if(user === undefined){
                    res.status(500).json({message: 'Not found user id'});
                }else{
                    let action = user.status === 1 ? 'archived' : 'unarchive';
                    doctrine.archived(tableName, [user.status,req.params.userId], function(err, user) {
                        if (err) {
                            res.status(500).json({message: 'Error when ' + action + ' user'});
                        }
                        res.status(200).json({message: 'User ' + action + ' successfully', data: user});
                    });
                }

            }

        });
    },
};

/**
 *
 * @param data
 * @returns {*}
 */
function hydrate(data) {
    data.forEach((item) => {
        item.password = null;
        item.created_at = moment(item.created_at).format('LLLL')
    });
    return data;
}