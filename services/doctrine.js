const database = require('../database/db');
const fs = require("fs")

/**
 * create new record
 * @param tableName
 * @param data
 * @param results
 */
const add =  (tableName,data, results) => {
    database.query(`INSERT INTO ${tableName} SET ?`,data , function (err) {
        if (err) {
            results(null, err);
        } else {
            findLastRows([tableName], (err, rows) => {
                if (err) {
                    results(null, err);
                } else {
                    results(null, rows.id);
                }
            });
        }

    });
}

/**
 * @param tableName
 * @param id
 * @param results
 */
const findLastRows = ([tableName, id=null], results) => {
    let sql = (id ===null) ? `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1` : `SELECT * FROM ${tableName} WHERE id=? LIMIT 1`;
    database.query(sql,[id], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}

/**
 * @param tableName
 * @param id
 * @param results
 */
const deleteItem = (tableName,[column, value], results) => {
    database.query(`DELETE FROM ${tableName} WHERE ${column}=?`,[value] , function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
}

/**
 * @param tableName
 * @param column
 * @param value
 * @param results
 */
const count = ([tableName, column=null, value=null], results) =>{
    let sql = (column ===null) ? `SELECT COUNT(*) as count FROM ${tableName}` : `SELECT COUNT(*) as count FROM ${tableName} WHERE ${column}=?`;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}

/**
 * @param tableName
 * @param value
 * @param results
 */
const deleteItemById = (tableName,value, results) =>{
    database.query(`DELETE FROM ${tableName} WHERE id=?`,[value] , function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows.changedRows);
        }

    });
 }

/**
 *
 * @param tableName
 * @param value
 * @param id
 * @param results
 */
const archived = (tableName,[value, id], results) =>{
    let status = value === 1 ? 0 : 1;
    database.query(`UPDATE ${tableName} SET status=? WHERE id=?`,[status, id] , function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows.changedRows);
        }
    });
}

/**
 * @param tableName
 * @param value
 * @param results
 */
const unarchived = (tableName,value, results) =>{
    database.query(`UPDATE ${tableName} SET status=1 WHERE id=?`,[value] , function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows.changedRows);
        }

    });
}

/**
 * @param tableName
 * @param all
 * @param results
 */
const findAll =  ([tableName , all=0], results) => {
    let sql = (all === 0)?`SELECT * FROM ${tableName} WHERE  status=true ORDER BY created_at DESC`:`SELECT * FROM ${tableName}  ORDER BY created_at DESC`;
      database.query(sql, function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
}



/**
 *
 * @param tableName
 * @param column
 * @param value
 * @param limit
 * @param results
 */
const findAllBy =  (tableName,[column, value], results) => {
    let sql = `SELECT * FROM ${tableName} WHERE ${column}=? ORDER BY created_at DESC `;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

});
}

/**
 *
 * @param tableName
 * @param column
 * @param value
 * @param limit
 * @param results
 */
const findLimitBy =  (tableName,[column, value], results) => {
    let sql = `SELECT * FROM ${tableName}  ORDER BY ${column} DESC LIMIT ${value}`;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
}

/**
 *
 * @param tableName
 * @param column
 * @param value
 * @param limit
 * @param results
 */
const findBy =  (tableName,[column, value, limit=0], results) => {
    let sql = limit === 0 ?`SELECT * FROM ${tableName} WHERE ${column}=? and status=1 ORDER BY created_at DESC`:`SELECT * FROM ${tableName} WHERE ${column}=? ORDER BY created_at DESC LIMIT ${limit} `;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }

    });
}

/**
 *
 * @param tableName
 * @param value
 * @param results
 */
const connect =  (tableName, value, results) => {
    let sql =`SELECT * FROM ${tableName} WHERE login=?  LIMIT 1 `;
    database.query(sql,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}

/**
 *
 * @param tableName string
 * @param value []
 * @param results callable
 */
const find =  (tableName, value, results) => {
      database.query(`SELECT * FROM ${tableName} WHERE id =?`,[value], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}

/**
 *
 * @param tableName string
 * @param column string
 * @param value any
 * @param id int
 * @param results callable
 */
const lock =  (tableName, [column, value, id], results) => {
      database.query(`UPDATE ${tableName} SET ${column} =?  WHERE id=?`,[value,id], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}
/**
 *
 * @param tableName string
 * @param column string
 * @param value any
 * @param id int
 * @param results callable
 */
const unlock =  (tableName, [column, value, id], results) => {
      database.query(`UPDATE ${tableName} SET ${column} =?  WHERE id=?`,[value,id], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}

/**
 * @param tableName string
 * @param id int
 * @param results callable
 */
const destroyItem =  (tableName,  id, results) => {
    database.query(`Delete from ${tableName}   WHERE id=?`,[id], function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows[0]);
        }

    });
}

/**
 *
 * @param tableName string
 * @param column string
 * @param words string
 * @param results callable
 */
const search =  (tableName,[column, words] ,results) => {
    database.query(`SELECT * FROM ${tableName} WHERE ${column} LIKE '%${words}%'` , function (err, rows) {
        if (err) {
            results(null, err);
        } else {
            results(null, rows);
        }
    });
}

/**
 * @param  file string link of file
 */
const deleteImage = (file)=>{
    try {
        let url = process.cwd()+'/public'+file;
        fs.unlinkSync(url)
        console.log("Successfully deleted the file.")
    } catch(err) {
        throw err
    }
};

/**
 * @param tableName
 * @param value
 * @param id
 * @param results
 */
const update = (tableName, [value, id], results) => {
    let columns = Object.keys(value);
    const columnsCount = columns.length - 1;
    let conditions ='';
    columns.forEach((column, index) => {
        if(columnsCount === index)
        {
            conditions += `${column} = ?`;
        }
        else{
            conditions += `${column} = ?,`;
        }
    })
    const values = Object.values(value);
    values.push(id);
    database.query(`UPDATE ${tableName} SET ${conditions} WHERE id=?`,values, function (err) {
        if (err) {
            results(null, err);
        } else {
            findLastRows([tableName, id], (err, rows) => {
                if (err) {
                    results(null, err);
                } else {
                    results(null, rows);
                }
            });
        }

    });
};

module.exports = {connect,findLastRows,findLimitBy, update, destroyItem, add, findAll, archived, findAllBy,  count, unarchived, findBy, find, lock, unlock, search, deleteImage,deleteItemById, deleteItem};