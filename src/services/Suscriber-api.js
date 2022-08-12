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
      return  { statusCode : err.response.status, 
                suscriber :null 
      };
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
const createSubscriberCorpEntities = async (_token, _clicod, _cuit, req, res) => {
  try {
    let fechaHoy= new Date().toISOString().slice(0, 10);  

    const request = {
      subscriber_name,
      organizationLegalName,
    } = req.body;

    const config = {
      method: 'post',

      url: ` ${URL}createSubscriberCorpEntities`,
      headers: {
        Accept: 'application/json',
        "Authorization": ` ${_token}`
      },
      data: {
        clicod: _clicod,
        subscriber_name: request.subscriber_name,
        organization_cuit: _cuit,
        organization_legal_name: request.organizationLegalName,
        subscriber_status_id: 1,
        subscriber_max_user_count:5,
        creation_date: fechaHoy,
        creation_user: 'testing'
      }
    }

    var res = await axios(config);
    return {
      statusCode: res.status,
      suscriber: res.data
    };
  } catch (err) {
    console.log(err.response.data.message);
    return {
      statusCode: err.response.status,
      suscriber: null
    };

  }
}

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
    assignUserSubscriberCorpEntity,
    createSubscriberCorpEntities
}