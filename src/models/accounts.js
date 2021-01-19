const { query } = require('../database/connDB');

class Account {
    CreateAccount(req, res, next) {
        query(`     
            INSERT INTO 
                contas (idPessoa,limiteSaqueDiario,tipoConta,dataCriacao)
            VALUES
                (${req.body.idPerson},${req.body.limit},${req.body.accountType},CONVERT(DATE,'${req.body.date}' ,103))
        `)
            .then((result) => {
                return res.json({ message: 'Conta criada com sucesso' });
            })
            .catch(next);
    }

    BlockAccount(req, res) {
        query(`
            UPDATE 
                contas
            SET
                flagAtivo = 0
            WHERE
                idConta = ${req.body.account} AND flagAtivo = 1
        `)
            .then((result) => {
                return result.rowsAffected > 0 ? res.json({ message: 'Conta bloqueada com sucesso' }) : res.status(403).json({ message: 'Conta já bloqueada' });
            })
            .catch((err) => {
                return res.status(500).send(err);
            });
    }
}
module.exports = new Account();
