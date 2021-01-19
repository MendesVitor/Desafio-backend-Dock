const { query } = require('../database/connDB');

class Operations {
    Deposit(req, res, next) {
        query(`
            DECLARE @ativo BIT = (
                SELECT
                    flagAtivo
                FROM
                    contas
                WHERE
                    idConta = ${req.body.account}
            )

            IF @ativo = 1
            BEGIN
                INSERT INTO 
                    transacoes (idConta,idTipoTransacao,valor,dataTransacao)
                VALUES
                    (${req.body.account},1,${req.body.value},CONVERT(DATE,'${req.body.date}' ,103))
                
                UPDATE
                    contas
                SET
                    saldo = saldo + ${req.body.value}
                WHERE   
                    idConta =${req.body.account}
                SELECT @ativo AS ativo
            END        
            ELSE
                SELECT @ativo AS ativo
        `)
            .then((result) => {
                return !result.recordset[0].ativo
                    ? res.status(403).json({ message: 'Conta bloqueada ou não encontrada' })
                    : res.json({ message: 'Depósito realizado com sucesso' });
            })
            .catch(next);
    }

    Balance(req, res, next) {
        query(`     
            SELECT
                FORMAT(saldo, 'C', 'pt-br') AS saldo 
            FROM
                contas
            WHERE
                idConta = ${req.params.account} and flagAtivo = 1
        `)
            .then((result) => {
                return result.rowsAffected > 0 ? res.json({ balance: result.recordset[0].saldo }) : res.status(403).json({ message: 'Conta bloqueada ou não encontrada' });
            })
            .catch(next);
    }

    Withdraw(req, res, next) {
        query(`     
            DECLARE @ativo BIT = (
                SELECT
                    flagAtivo
                FROM
                    contas
                WHERE
                    idConta = ${req.body.account}
            )

            DECLARE @limiteSaque INT = (
                SELECT
                    limiteSaqueDiario
                FROM
                    contas
                WHERE
                    idConta = ${req.body.account}
            )

            DECLARE @sacado MONEY = (
                SELECT ISNULL(
                    (SELECT SUM(valor)
                    FROM 
                        transacoes
                    WHERE 
                        dataTransacao = (CONVERT(DATE,'${req.body.date}' ,103)
                    )
                ),0)
            )

            DECLARE @saldo MONEY = (
                SELECT
                    saldo
                FROM
                    contas
                WHERE
                    idConta = ${req.body.account}
            )

            IF @ativo = 1 AND (@sacado + ${req.body.value} < @limiteSaque AND ${req.body.value} < @limiteSaque ) AND @saldo - ${req.body.value} > 0
            BEGIN
                INSERT INTO 
                    transacoes (idConta,idTipoTransacao,valor,dataTransacao)
                VALUES
                    (${req.body.account},2,${req.body.value},CONVERT(DATE,'${req.body.date}' ,103))

                UPDATE
                    contas
                SET
                    saldo = saldo - ${req.body.value}
                WHERE   
                    idConta =${req.body.account}

                SELECT @ativo AS ativo
            END
            ELSE IF @ativo = 1 AND @saldo - ${req.body.value} < 0
                SELECT 1 AS saldoInsuficiente
            ELSE IF @ativo = 1 AND (@sacado + ${req.body.value} >= @limiteSaque OR ${req.body.value} >= @limiteSaque ) AND @saldo - ${req.body.value} > 0
                SELECT 1 AS limite
            ELSE
                SELECT @ativo AS ativo
        `)
            .then((result) => {
                if (result.recordset[0].ativo) {
                    return res.json({ message: 'Saque realizado com sucesso' });
                } else if (result.recordset[0].saldoInsuficiente) {
                    return res.status(400).json({ message: 'Saldo insuficiente' });
                } else if (result.recordset[0].limite) {
                    return res.status(400).json({ message: 'Limite de saque diário excedido' });
                } else {
                    return res.status(403).json({ message: 'Conta bloqueada ou não encontrada' });
                }
            })
            .catch(next);
    }

    Statement(req, res, next) {
        query(`     
            SELECT 
                b.tipo,
                CASE
                    WHEN b.idTipoTransacao = 1 THEN '+' + FORMAT(a.valor, 'C', 'pt-br') 
                    ELSE '-' + FORMAT(a.valor, 'C', 'pt-br')
                END AS valor,
                CONVERT(VARCHAR(10),a.dataTransacao,103) AS dataTransacao
            FROM
                transacoes a
            JOIN 
                tipoTransacao b ON a.idTipoTransacao = b.idTipoTransacao
            JOIN
                contas c ON a.idConta = c.idConta
            WHERE
                a.idConta = ${req.params.account} AND c.flagAtivo = 1
            ORDER BY CONVERT(DATE,dataTransacao,103) DESC
        `)
            .then((result) => {
                return result.rowsAffected > 0 ? res.json(result.recordset) : res.status(403).json({ message: 'Conta bloqueada ou não encontrada' });
            })
            .catch(next);
    }

    StatementByPeriod(req, res, next) {
        query(`  
            DECLARE @ativo BIT = (
                SELECT
                    flagAtivo
                FROM
                    contas
                WHERE
                    idConta = ${req.params.account}
            )
            IF CONVERT(DATE,'${req.query.startDate}' ,103) > CONVERT(DATE,'${req.query.finalDate}',103)
                SELECT 1 AS dataInvalida, @ativo as ativo 
            ELSE
                SELECT 
                    b.tipo,
                    CASE
                        WHEN b.idTipoTransacao = 1 THEN '+' + FORMAT(a.valor, 'C', 'pt-br') 
                        ELSE '-' + FORMAT(a.valor, 'C', 'pt-br')
                    END AS valor,
                    CONVERT(VARCHAR(10),a.dataTransacao,103) AS dataTransacao,c.flagAtivo as ativo
                FROM
                    transacoes a
                JOIN 
                    tipoTransacao b ON a.idTipoTransacao = b.idTipoTransacao
                JOIN
                    contas c ON a.idConta = c.idConta
                WHERE
                    a.idConta = ${req.params.account} AND c.flagAtivo = 1 AND  a.dataTransacao between CONVERT(DATE,'${req.query.startDate}',103) and CONVERT(DATE,'${req.query.finalDate}' ,103)
                ORDER BY CONVERT(DATE,dataTransacao,103) DESC
                SELECT @ativo as ativo
        `)
            .then((result) => {
                if (result.rowsAffected[1] === 0) {
                    return res.json({ messahe: 'Sem lançamentos no período' });
                } else if (result.recordset[0].dataInvalida) {
                    return res.status(400).json({ message: 'Erro, data inicial maior que data final' });
                }
                return result.recordset[0].ativo ? res.json(result.recordset) : res.status(403).json({ message: 'Conta bloqueada ou não encontrada' });
            })
            .catch(next);
    }
}

module.exports = new Operations();
