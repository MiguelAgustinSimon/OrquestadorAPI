const axios = require('axios');

const URL = 'https://accounts.errepar.com/organization-api/api/Organization/'

//-------------------------------------------------- ENDPOINTS GET---------------------------------------------------------------------
const getByCuitOrganizationCorpEntities = async (_token, _cuit) => {
    try {
            const config = {
                method: 'get',
                url: ` ${URL}getByCuitOrganizationCorpEntities`,
                headers: {
                  Accept: 'application/json',
                  "Authorization" : ` ${_token}` 
                },
                params: { organizationCuit: _cuit}
            }
            var res = await axios(config);
  
            console.log("---------------------------------status----------------------------------------------------");
            console.log(res);

            console.log("---------------------------------data----------------------------------------------------");
            console.log(res.data.code);

            return  { statusCode : res.status, 
                      organizacion : res.data 
            };
    }catch (error) {
        throw error;
        
    }   
}


//-------------------------------------------------- ENDPOINTS POST---------------------------------------------------------------------
const createOrganizacionCorpEntities = async (_token, _cuit,req, res) => {
    try {
       const request = { 
            organizationName,
            organizationTypeCode,
            organizationLegalName,
            organizationCuit:_cuit,
            organizationMaxAccessCount,
            isActive,
            user
        } = req.body;
        console.log(request);
        // const config = {
        //     method: 'post',
            
        //     url: ` ${URL}createOrganizacionCorpEntities`,
        //     headers: {
        //         Accept: 'application/json',
        //         "Authorization" : ` ${_token}` 
        //     },
        //     data: {  organizationName: request.organizationName,
        //             organizationTypeCode: 'TESTING-ORG',
        //             organizationLegalName: request.organizationLegalName,
        //             organizationCuit: request.organizationCuit,
        //             organizationMaxAccessCount: 1,
        //             isActive: true,
        //             user:'Test'}
        // }
        // var res = await axios(config);
        // return  { statusCode : res.status, 
        //             suscriber : res.data 
        // };
    }catch (err) {
        console.log(err);
        //throw err;
    }   
  }

module.exports = {
    //Aca exporto los metodos
    getByCuitOrganizationCorpEntities,
    createOrganizacionCorpEntities
}