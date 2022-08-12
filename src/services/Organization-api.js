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
        "Authorization": ` ${_token}`
      },
      params: { organizationCuit: _cuit }
    }
    var res = await axios(config);

    return {
      statusCode: res.status,
      organizacion: res.data
    };
  } catch (err) {
    return {
      statusCode: err.response.status,
      organizacion: null
    };

  }
}


//-------------------------------------------------- ENDPOINTS POST---------------------------------------------------------------------
const createOrganizacionCorpEntities = async (_token, _cuit, req, res) => {
  try {
    const request = {
      organizationName,
      organizationLegalName
    } = req.body;

    const config = {
      method: 'post',

      url: ` ${URL}createOrganizationCorpEntities`,
      headers: {
        Accept: 'application/json',
        "Authorization": ` ${_token}`
      },
      data: {
        organizationName: request.organizationName,
        organizationTypeCode: 'TESTING-ORG',
        organizationLegalName: request.organizationLegalName,
        organizationCuit: _cuit,
        organizationMaxAccessCount: 1,
        isActive: true,
        user: 'testing'
      }
    }
    console.log(config.data)
    var res = await axios(config);
    console.log(res)
    return {
      statusCode: res.status,
      organizacion: res.data
    };
  } catch (err) {
    console.log("ENTRO AL CATCH ENDPOINT");
    console.log(err)
    return {
      statusCode: err.response.status,
      organizacion: null
    };

  }
}

module.exports = {
  //Aca exporto los metodos
  getByCuitOrganizationCorpEntities,
  createOrganizacionCorpEntities
}