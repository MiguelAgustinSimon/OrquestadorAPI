const {getSubscriberCorpEntities,
    getUsersSubscriberCorpEntities,
    assignUserSubscriberCorpEntity
} = require("../services/Suscriber-api");

//-------------------------------------------------- ENDPOINTS GET---------------------------------------------------------------------
const getCustomerUserCorpCustomer = async(req,res) => {
    try {
        var token = req.headers['authorization'];
        const {clicod}= req.params; //ej: 445540
        let { statusCode, suscriber } = await getSubscriberCorpEntities(token,clicod);
        
        if (statusCode == 200){
            return res.status(200).json({suscriber})
        }
    } catch (error) {
        console.log(error)
    }
}

const getUsersFromSubscriberCorpEntities = async(req,res) => {
    try {
        var token = req.headers['authorization'];
        const {clicod}= req.params; //ej: 445540
        let offset= req.query.offset;
        let limit= req.query.limit;

        let { statusCode, suscriber } = await getUsersSubscriberCorpEntities(token,clicod);
        
        if (statusCode == 200){
            return res.status(200).json({suscriber})
        }
    } catch (error) {
        console.log(error)
    }
}
//-------------------------------------------------- ENDPOINTS POST---------------------------------------------------------------------
const assignUserSubscriberCorpEntities = async(req,res) => {
    try {
        var token = req.headers['authorization'];
        const request = { 
            subscriber_id,
            user_id,     
            creation_user,
            creation_date
        } = req.body;
        let { statusCode, suscriber } = await assignUserSubscriberCorpEntity(token,request);
        
        if (statusCode == 200){
            return res.status(200).json({suscriber})
        }
    } catch (error) {
        console.log(error)
    }
}
//-------------------------------------------------- ENDPOINTS UPDATE---------------------------------------------------------------------
module.exports = {
    //Aca exporto los metodos
    getCustomerUserCorpCustomer,
    getUsersFromSubscriberCorpEntities,
    assignUserSubscriberCorpEntities
    
  }