const axios = require('axios');

const URL = 'https://accounts.errepar.com/subscribers/api/'

//-------------------------------------------------- ENDPOINTS GET---------------------------------------------------------------------
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
            var res = await axios(config);
            return  { statusCode : res.status, 
                      suscriber : res.data 
            };
    }catch (err) {
        throw err;
    }   
}

const getUsersSubscriberCorpEntities = async (_token, _clicod) => {
  try {
          const config = {
              method: 'get',
              url: ` ${URL}getUsersSubscriberCorpEntities`,
              headers: {
                Accept: 'application/json',
                "Authorization" : ` ${_token}` 
              },
              params: { clicod: _clicod,
                        offset:0,
                        limit:9999}
          }
          var res = await axios(config);
          return  { statusCode : res.status, 
                    suscriber : res.data 
          };
  }catch (err) {
      throw err;
  }   
}


//-------------------------------------------------- ENDPOINTS POST----------------------------------------------------------------------
const assignUserSubscriberCorpEntity = async (_token, request) => {
  try {
          const config = {
              method: 'post',
             
              url: ` ${URL}assignUserSubscriberCorpEntity`,
              headers: {
                Accept: 'application/json',
                "Authorization" : ` ${_token}` 
              },
              data: { subscriber_id:request.subscriber_id,
                        user_id:request.user_id,
                        creation_user:request.creation_user,
                        creation_date:request.creation_date}
          }
          var res = await axios(config);
          return  { statusCode : res.status, 
                    suscriber : res.data 
          };
  }catch (err) {
      throw err;
  }   
}

//-------------------------------------------------- ENDPOINTS UPDATE---------------------------------------------------------------------
module.exports = {
    //Aca exporto los metodos
    getSubscriberCorpEntities,
    getUsersSubscriberCorpEntities,
    assignUserSubscriberCorpEntity
}