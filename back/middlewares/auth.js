const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    eAdmin: async function(req,res, netx){
       const authHeader = req.headers.authorization;
       // console.log(authHeader);

       if(!authHeader){
        return res.status(400).json({
            erro:true,
            mensagem:"Error: Necessario realizar o login para acessar a pagina! Falta o token A!"
        })
       }

       const [, token] = authHeader.split(' ');
       // console.log("Token: " + token);

       if(!token){
        return res.status(400).json({
            erro:true,
            mensagem:"Error: Necessario realizar o login para acessar a pagina! Falta o token B!"
        })
       }

       try {
            const decode = await promisify(jwt.verify)(token, "T3J8K1C9A5N686DSCTQ97")
            req.userId = decode.id
            return netx()
       } catch (error) {
            return res.status(400).json({
                erro:true,
                mensagem:"Error: Necessario realizar o login para acessar a pagina! token invalido!"
            })
       }
    }
}