

const {getSubscriberCorpEntities} = require("../services/Suscriber-api");


const getCustomerUserCorpCustomer = async(req,res) => {
    try {
        var token = req.headers['authorization']
        var clicod = 445540
        
        let { statusCode, suscriber } = await getSubscriberCorpEntities(token,clicod);
        
        if (statusCode == 200){

            return res.status(200).json({suscriber})
        }
        
        

        

    } catch (error) {
        console.log(error)
    }
   
}

module.exports = {
    //Aca exporto los metodos
    getCustomerUserCorpCustomer
    
  }