const axios = require('axios');

const URL = 'https://accounts.errepar.com/subscribers/api/'

const getSubscriberCorpEntities = async (_token, _clicod) => {
    
    try {

            const config = {
                method: 'get',
                url: ` ${URL}getSubscriberCorpEntities`,
                headers: {
                  Accept: 'application/json',
                  "Authorization" : ` ${_token}` 
                },
                params: { clicod: _clicod}
            }
         
            var res = await axios(config)
          
            return  { statusCode : res.status, 
                      suscriber : res.data 
                    };
   

    } catch (err) {
        throw err;
      }

   
}



module.exports = {
    //Aca exporto los metodos
    getSubscriberCorpEntities
    
  }