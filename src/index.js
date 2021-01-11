const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Bem vindo!',
        endpoints: [
            '[GET]/bibliografia',
            '[GET]/bibliografia/find/{field}',
            '[GET]/bibliografia/{id}',
            '[POST]/bibliografia',
            '[PUT]/bibliografia/{id}',
            '[PATCH]/bibliografia/{id}',
            '[DELETE]/bibliografia/{id}'
        ]
    });
});

//-->rotas
require('./app/controllers/bibliografiaCtrl')(app);

const server = app.listen(process.env.PORT || 3000, () => {
    var port = server.address().port;
    console.log("API executando na porta: ", port);
});