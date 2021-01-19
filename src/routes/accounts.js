const router = require('express').Router();
const Accounts = require('../models/accounts');

router.post('/criar', (req, res, next) => {
    Accounts.CreateAccount(req, res, next);
});

router.put('/bloquear', (req, res, next) => {
    Accounts.BlockAccount(req, res, next);
});

module.exports = router;
