const router = require('express').Router();
const Operations = require('../models/operations');

router.post('/deposito', (req, res, next) => {
    Operations.Deposit(req, res, next);
});
router.get('/saldo/:account', (req, res, next) => {
    Operations.Balance(req, res, next);
});
router.post('/saque', (req, res, next) => {
    Operations.Withdraw(req, res, next);
});
router.get('/extrato/:account', (req, res, next) => {
    Operations.Statement(req, res, next);
});
router.get('/extrato-periodo/:account', (req, res, next) => {
    Operations.StatementByPeriod(req, res, next);
});

module.exports = router;
