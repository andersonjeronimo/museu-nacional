const Model = require('../app/models/bibliografia');
const Bibliografia = new Model();

var config = require('../../config/config.json');

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(config.dbURL);
    // const connection = await mysql.createConnection("mysql://root:991187842MySQL@localhost:3306/bibliography");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function getAll() {
    const conn = await connect();
    const [TextRow] = await conn.query('SELECT * FROM bibliografias;');
    return TextRow;
}

async function getById(id) {
    const conn = await connect();
    const [TextRow] = await conn.query(`SELECT * FROM bibliografias WHERE id = ${id};`);
    return TextRow;
}

async function getByField(query) {
    const conn = await connect();
    let sql = 'SELECT * FROM bibliografias WHERE';
    Object.entries(query).forEach(entry => {
        let [key, value] = entry;
        if (Bibliografia.hasOwnProperty(key)) {
            sql = sql.concat(` bibliografias.${key}=${value} AND`);
        }
    });
    sql = sql.substring(0, sql.length - 4);
    sql = sql.concat(';');
    console.log(sql);
    const [TextRow] = await conn.query(sql);
    return TextRow;
}

async function post(bibliografia) {
    const conn = await connect();

    let sqlCol = 'INSERT INTO bibliografias(';
    let sqlVal = 'VALUES (';
    let values = [];

    Object.entries(bibliografia).forEach(entry => {
        let [key, value] = entry;
        if (Bibliografia.hasOwnProperty(key)) {
            sqlCol = sqlCol.concat(`${key},`);
            sqlVal = sqlVal.concat('?,');
            values.push(value);
        }
    });
    sqlCol = sqlCol.substring(0, sqlCol.length - 1);
    sqlCol = sqlCol.concat(') ');

    sqlVal = sqlVal.substring(0, sqlVal.length - 1);
    sqlVal = sqlVal.concat(');');

    let sql = '';
    sql = sql.concat(sqlCol);
    sql = sql.concat(sqlVal);

    return await conn.query(sql, values);
}

async function put(id, bibliografia) {
    const conn = await connect();
    // const sql = 'UPDATE bibliogafias SET campoA=?, campoB=?, campoC=?, campoD=?, WHERE id=?';
    let sql = 'UPDATE bibliografias SET ';
    let values = [];
    Object.entries(bibliografia).forEach(entry => {
        let [key, value] = entry;
        if (Bibliografia.hasOwnProperty(key)) {
            sql = sql.concat(`${key}=?,`);
            values.push(value);
        }
    });
    values.push(id);
    sql = sql.substring(0, sql.length - 1);
    sql = sql.concat(' WHERE id=?;');
    return await conn.query(sql, values);
}

async function patch(id, bibliogafia) {
    const conn = await connect();
    // const sql = 'UPDATE bibliogafias SET campoA=?, campoB=?, campoC=?, campoD=?, WHERE id=?';
    let sql = 'UPDATE bibliografias SET ';
    let values = [];
    Object.entries(bibliogafia).forEach(entry => {
        let [key, value] = entry;
        if (Bibliografia.hasOwnProperty(key)) {
            sql = sql.concat(`${key}=?,`);
            values.push(value);
        }
    });
    values.push(id);
    sql = sql.substring(0, sql.length - 1);
    sql = sql.concat(' WHERE id=?;');
    console.log(sql);
    return await conn.query(sql, values);
}

async function remove(id) {
    const conn = await connect();
    const sql = 'DELETE FROM bibliografias WHERE id=?;';
    return await conn.query(sql, [id]);
}

module.exports = { getAll, getById, getByField, post, put, patch, remove }