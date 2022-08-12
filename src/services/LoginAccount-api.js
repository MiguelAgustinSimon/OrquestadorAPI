const axios = require('axios');

const URL = 'https://accounts.errepar.com/login/api/';
const URL2 = 'https://accounts.errepar.com/eauth/eAuth/create/';
//-------------------------------------------------- ENDPOINTS GET---------------------------------------------------------------------
const loginAccountByemail = async (_token, _email) => {
    try {
            const config = {
                method: 'get',
                url: ` ${URL}loginAccountByemail`,
                headers: {
                  Accept: 'application/json',
                  "Authorization" : ` ${_token}` 
                },
                params: { email: _email}
            }
            var res = await axios(config);

            return  { statusCode : res.status, 
                loginAccount : res.data 
            };
    }catch (err) {
      return  { statusCode : err.response.status, 
                loginAccount :null 
      };
    }   
}




//-------------------------------------------------- ENDPOINTS POST----------------------------------------------------------------------
const createUserBaseAccountEAuth = async (_token, _email, req, res) => {
  try {
    const config = {
      method: 'post',

      url: ` ${URL2}createUserBaseAccountEAuth`,
      headers: {
        Accept: 'application/json',
        "Authorization": ` ${_token}`
      },
      data: {
        username: _email,
        password: '123456789As+'
      }
    }
    
    var res = await axios(config);

    return {
      statusCode: res.status,
      cognitoUser: res.data
    };
  } catch (err) {
    console.log(err.response.data.message);
    return {
      statusCode: err.response.status,
      cognitoUser: null
    };

  }
}

const createLoginAccountCorpEntities = async (_token, _accountExternalRefId,_email, req, res) => {
    try {
        console.log(_accountExternalRefId);
        const request = {
            subscriber_name
          } = req.body;

      const config = {
        method: 'post',
        url: ` ${URL}loginAccountCreate`,
        headers: {
          Accept: 'application/json',
          "Authorization": ` ${_token}`
        },
        data: {
            accountExternalRefId: _accountExternalRefId,
            email: _email,
            firstName:request.subscriber_name,
            lastName:request.subscriber_name,
            modificationUser:'test',
            accountStatusCode:'ACTIVE'
        }
      }
  
      var res = await axios(config);
      //console.log(res);
      return {
        statusCode: res.status,
        loginAccount: res.data
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: err.response.status,
        loginAccount: null
      };
  
    }
  }



//-------------------------------------------------- ENDPOINTS UPDATE---------------------------------------------------------------------
module.exports = {
    //Aca exporto los metodos
    loginAccountByemail,
    createUserBaseAccountEAuth,
    createLoginAccountCorpEntities
}