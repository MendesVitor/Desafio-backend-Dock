const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { join } = require('path');

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? `${join(__dirname, './.env.test')}` : `${join(__dirname, './.env')}`,
});

const app = express();
app.disable('x-powered-by');
if (process.env.NODE_ENV === 'test') {
    app.use(require('morgan')('dev'));
}
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./src/routes'));

//error handler de teste
if (process.env.NODE_ENV === 'test') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.stack,
                error: err,
            },
        });
    });
}

//error handler de produção
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server initialiazed on port ${process.env.APP_PORT}`);
});
