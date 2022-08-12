const {getSubscriberCorpEntities,
    getUsersSubscriberCorpEntities,
    assignUserSubscriberCorpEntity,
    createSubscriberCorpEntities
} = require("../services/Suscriber-api");
const {getByCuitOrganizationCorpEntities,
    createOrganizacionCorpEntities
} = require("../services/Organization-api");

//-------------------------------------------------- ENDPOINTS POST---------------------------------------------------------------------
const createCustomerUserCorpCustomer = async(req,res) => {
    try {
        var token = req.headers['authorization'];
        const {clicod}= req.params; //ej: 445540
        const {cuit}= req.params; //ej: 20286721568

     


        //paso 1 OK: verificar si existe org con cuit
        let { statusCode, organizacion } = await getByCuitOrganizationCorpEntities(token,cuit);

     

       // let { statusCode, suscriber } = await getSubscriberCorpEntities(token,clicod);
        if (statusCode == 200){
            return res.status(200).json({organizacion});
        }
        else{
            //paso 2: Darlo de alta en tabla Organizaciones 
            let { statusCode, organizacion } = await createOrganizacionCorpEntities(token,cuit,req,res);
            if (statusCode == 200){
                //return res.status(200).json({organizacion});
                
                //Paso 3: Verificar si existe un suscriptor con el nro de suscriptor informado en tabla Suscriptores
                let { statusCode, suscriber } = await getSubscriberCorpEntities(token,clicod);
                if (statusCode == 200){
                    //return res.status(200).json({suscriber});
                    console.log("Ya existe un nro de suscriptor con el numero informado");
                }
                else{
                    //paso 4: Si no existe, dar de alta al suscriptor en tabla Suscriptores 
                    let { statusCode, suscriber } = await createSubscriberCorpEntities(token,clicod,cuit,req,res);
                    if (statusCode == 200 || statusCode==201){
                        return res.status(200).json({suscriber});
                    }
                    else{
                        console.log(statusCode);
                        console.log("NO ANDUVO createSubscriberCorpEntities");
                    }
                }

            }
            else{
                console.log("NO ANDUVO createOrganizacionCorpEntities");
            }
        }

       

    } catch (error) {
        console.log("---------------------------------ENTRO CATCH----------------------------------------------------");
        //console.log(error);
        // if (error.response) {
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        //   }
    }
}


module.exports = {
    //Aca exporto los metodos
    createCustomerUserCorpCustomer
    
  }