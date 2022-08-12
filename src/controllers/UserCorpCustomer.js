const {getSubscriberCorpEntities,
    getUsersSubscriberCorpEntities,
    assignUserSubscriberCorpEntity,
    createSubscriberCorpEntities
} = require("../services/Suscriber-api");

const {getByCuitOrganizationCorpEntities,
    getUserOrganizationByLoginAccountCorpEntities,
    createOrganizacionCorpEntities,
    addUserOrganizationCorpEntities
} = require("../services/Organization-api");

const {loginAccountByemail,
    createUserBaseAccountEAuth,
    createLoginAccountCorpEntities
} = require("../services/LoginAccount-api");

//-------------------------------------------------- ENDPOINTS POST---------------------------------------------------------------------
const createCustomerUserCorpCustomer = async(req,res) => {
    try {
        var token = req.headers['authorization'];
        const {clicod}= req.params; //ej: 445540
        const {cuit}= req.params; //ej: 20286721568
        const {email}= req.params; 

        //paso 1 OK: verificar si existe org con cuit
        let { statusCode, organizacion } = await getByCuitOrganizationCorpEntities(token,cuit);
        if (statusCode == 200){
            return res.status(200).json({organizacion});
        }
        else{
            //paso 2: Darlo de alta en tabla Organizaciones 
            let { statusCode, organizacion } = await createOrganizacionCorpEntities(token,cuit,req,res);
            if (statusCode == 200){
                //return res.status(200).json({organizacion});
                let idOrg= organizacion.data.organizationId;

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
                        //return res.status(200).json({suscriber});
                            let subscriber_id=suscriber.subscriber_id;
                        //Paso 5: Verificar si ya existe la cuenta de mail en la tabla Cuentas de login con el email informado
                        let { statusCode, loginAccount } = await loginAccountByemail(token,email);
                        if (statusCode == 200){
                            //obtener el loginAccountId -> console.log(loginAccount.loginAccount.loginAccountId);
                            let loginAccountId=loginAccount.loginAccount.loginAccountId;
                
                            console.log(loginAccountId);
                            //return res.status(200).json({loginAccount});
                        }
                        else
                        {
                            console.log("NO EXISTE loginAccountByemail");
                            //PASO 6, Dar de alta la cuenta en Cognito y Login
                            let { statusCode, cognitoUser } = await createUserBaseAccountEAuth(token,email,req,res);
                            if (statusCode == 200){
                                 let accountExternalRefId=cognitoUser.cognitoUser.User.Username;
                
                                //Dar de alta la cuenta  en tabla Cuenta de Login
                                let { statusCode, loginAccount } = await createLoginAccountCorpEntities(token,accountExternalRefId,email,req,res);
                                if (statusCode == 200){
                                    console.log(loginAccount.data.loginAccountId);
                                    let loginAccountId=loginAccount.data.loginAccountId;

                                    //PASO 7 Verificar si existe un usuario asociado a la organización con el Id Login Account
                                    let { statusCode, UserOrganization } = await getUserOrganizationByLoginAccountCorpEntities(token,loginAccountId,req,res);
                                    if (statusCode == 200){
                                        let unOrganizationId=UserOrganization.data[0].organizationId;
                                    } 
                                    else{

                                        //PASO 8: Si no existe, Dar de alta el usuario de la organización
                                        let { statusCode, UserOrganization } = await addUserOrganizationCorpEntities(token,idOrg,loginAccountId,req,res);
                                        if (statusCode == 200){
                                            console.log(UserOrganization);
                                        } 
                                    }
                                    //PASO 9: Llamar al servicio Alta_UsuarioOrganización_Suscriptor 
                                    let { status, suscriber } = await assignUserSubscriberCorpEntity(token,idOrg,subscriber_id,req,res);
                                    if (status == 200){
                                        console.log(suscriber);
                                    } 
                                }
                            }
                        }
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
        console.log(error);
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