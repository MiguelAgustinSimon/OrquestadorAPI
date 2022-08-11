var jwt = require('jsonwebtoken');
//Authorization: Barer <token>
const VerificarToken =async (req, res, next) => {
    try {
        // let token = req.get('token') //Obtengo el token de los headers
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){
          const bearerToken = bearerHeader.split(" ")[1];
          req.token = bearerToken;
        }else{
          res.sendStatus(403);
        }
      } catch (error) {
        return res.status(403).json({message: "Ocurrio un error al autenticar el token. Verifique su token por favor.", error: error})
      }
     
      jwt.verify(req.token, process.env.TOKEN_SECRET_KEY, (error, authData) => {
        //req.token.expiresIn= '365d';

        if(error){
          res.sendStatus(403);
        }else{
          next();
        }
      })
  };
  
  module.exports = VerificarToken;

 