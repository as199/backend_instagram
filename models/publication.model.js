const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

const Publication= function (publication) {
    this.id = uuidv4();
    this.libelle = publication.libelle;
    this.description = publication.description;
    this.image = publication.image;
    this.published_by = publication.published_by;
    this.created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
}
module.exports = Publication;