const Publication = require('../models/publication.model');
const doctrine = require('../services/doctrine');
const moment = require("moment");
const tableName = 'publications';
module.exports = {
    getAllPublications : function(req, res, next) {
        doctrine.findAll([tableName], function(err, rows) {
            if (err) {
                res.status(500).json({message: 'Error when getting publications'});
            }
            else{
                    res.status(200).json( hydrate(rows) );
                }
        });
    },
    getAllPublicationsByMe : function(req, res, next) {
        let userID =  req.decoded.id;
        doctrine.findAllBy(tableName,['published_by',userID], function(err, rows) {
            if (err) {
                res.status(500).json({message: 'Error when getting publications'});
            }
            else{
                res.status(200).json( hydrate(rows) );
            }
        });
    },
    getPublicationById : function(req, res, next) {
        doctrine.find(tableName, req.params.id, function(err, publication) {
            if (err) {
                res.status(500).json({message: 'Error when getting publication'});
            }
            res.status(200).json(publication);
        });
    },

    createPublication : function(req, res, next) {
        req.body.published_by = req.decoded.id;
        doctrine.add(tableName, new Publication(req.body), (err, publicationId)=>{
            if (err) {
                res.status(500).json({message: 'Error when creating publication 2'});
            }
            else{
                res.status(200).json({message: 'Publication created successfully'});
            }
        });
    },
    updatePublication : function(req, res, next) {
        req.body.published_by = req.decoded.id;

        doctrine.find(tableName, req.params.id, function(err, rows) {
            if (err) {
                res.status(500).json({message: 'Error when getting  publication to update'});
            }
            else{
                let publication = {
                    libelle: req.body.libelle,
                    description: req.body.description,
                    published_by: req.body.published_by,
                    image: req.body.image
                };
                doctrine.update(tableName, [publication, req.params.publicationId], function(err, publication) {
                    if (err) {
                        res.status(500).json({message: 'Error when updating publication 1'});
                    }
                    else{
                        doctrine.update('localisations', [localisation, publication.localisations_id], function(err, localisation) {
                            if (err) {
                                res.status(500).json({message: 'Error when updating publication'});
                            }
                            else {
                                res.status(200).json({message: 'Publication updated'});
                            }
                        });
                    }
                });
            }
        });

    },
    deletePublication: function(req, res, next) {
        let userID =  req.decoded.id;
        doctrine.find(tableName, req.params.id, function(err, publication) {
            if (err) {
                res.status(500).json({message: 'Not found publication id'});
            }
            if(publication.published_by !== userID){
                res.status(500).json({message: 'You are not the owner of this publication'});
            }else{
                doctrine.destroyItem(tableName, req.params.id, function(err, publication) {
                    if (err) {
                        res.status(500).json({message: 'Error when deleting publication'});
                    }
                    else{
                        res.status(200).json({message: 'Publication deleted'});
                    }
                });
            }
        });

    },
}

/**
 *
 * @param data
 * @returns {*}
 */
function hydrate(data) {
    data.forEach((item) => {
        item.created_at = moment(item.created_at).fromNow ();
    });
    return data;
}