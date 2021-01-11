const express = require('express');
const router = express.Router();
const url = require('url');

//SELECT
router.get('/', (req, res) => {
    (async() => {
        const db = require('../../database/db');
        const result = await db.getAll();
        res.status(200).send(result);
    })();
});

//SELECT_BY_QUERY_STRING
router.get('/find', (req, res) => {
    (async() => {
        const db = require('../../database/db');
        const queryObject = url.parse(req.url, true).query;
        const result = await db.getByField(queryObject);
        res.status(200).send(result);
    })();
});

//INSERT
router.post('/', (req, res) => {
    (async() => {
        const db = require('../../database/db');
        const result = await db.post(req.body);
        res.status(200).send(result);
    })();
});

//SELECT by ID
router.get('/:id', (req, res) => {
    (async() => {
        const db = require('../../database/db');
        const id = parseInt(req.params.id);
        const result = await db.getById(id);
        res.status(200).send(result);
    })();
});

//UPDATE
router.put('/:id', (req, res) => {
    (async() => {
        const db = require('../../database/db');
        const id = parseInt(req.params.id);
        let result = await db.put(id, req.body);
        res.status(200).send(result);
    })();
});

router.patch('/:id', (req, res) => {
    (async() => {
        const db = require('../../database/db');
        const id = parseInt(req.params.id);
        let result = await db.patch(id, req.body);
        res.status(200).send(result);
    })();
});

//DELETE 
router.delete('/:id', (req, res) => {
    (async() => {
        const db = require('../../database/db');
        const id = parseInt(req.params.id);
        let result = await db.remove(id);
        res.status(200).send(result);
    })();
});

module.exports = (app) => app.use('/bibliografia', router);