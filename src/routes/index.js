const router = require('express').Router();

router.use('/conta', require('./accounts'));
router.use('/operacao', require('./operations'));

module.exports = router;
