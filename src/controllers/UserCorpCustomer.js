const {getSubscriberCorpEntities,
    getUsersSubscriberCorpEntities,
    assignUserSubscriberCorpEntity
} = require("../services/Suscriber-api");
const {getByCuitOrganizationCorpEntities,
    createOrganizacionCorpEntities
} = require("../services/Organization-api");

//-------------------------------------------------- ENDPOINTS GET---------------------------------------------------------------------
const createCustomerUserCorpCustomer = async(req,res) => {
    try {
        var token = req.headers['authorization'];
        const {clicod}= req.params; //ej: 445540
        const {cuit}= req.params; //ej: 20286721568


        //paso 1 OK: verificar si existe org con cuit
        //let { statusCode, organizacion } = await getByCuitOrganizationCorpEntities(token,cuit);

        //paso 2: verificar si existe org con cuit
        let { status, org } = await createOrganizacionCorpEntities(token,cuit);







        //let { statusCode, suscriber } = await getSubscriberCorpEntities(token,clicod);
        // if (statusCode == 200){
        //     return res.status(200).json({organizacion});
        // }
        // else{
        //     //paso 2: Darlo de alta en tabla Organizaciones 
        //     let { statusCode, organizacion } = await createOrganizacionCorpEntities(token,cuit);
        //     console.log("ORGANIZACION: " + organizacion.data);
        // }

    } catch (error) {
        console.log("---------------------------------ENTRO CATCH----------------------------------------------------");
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        //console.log(error)
    }
}

//-------------------------------------------------- ENDPOINTS POST---------------------------------------------------------------------
// const assignUserSubscriberCorpEntities = async(req,res) => {
//     try {
//         var token = req.headers['authorization'];
//         const request = { 
//             subscriber_id,
//             user_id,     
//             creation_user,
//             creation_date
//         } = req.body;
//         let { statusCode, suscriber } = await assignUserSubscriberCorpEntity(token,request);
        
//         if (statusCode == 200){
//             return res.status(200).json({suscriber})
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//-------------------------------------------------- ENDPOINTS UPDATE---------------------------------------------------------------------
module.exports = {
    //Aca exporto los metodos
    createCustomerUserCorpCustomer
    
  }