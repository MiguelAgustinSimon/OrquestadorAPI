

const {getSubscriberCorpEntities} = require("../service/SuscriptorController");


const crearSuscriptor=async(req,res)=>{
    try {
        console.log("llego getSubscriberCorpEntities");
        return getSubscriberCorpEntities();
    } catch (error) {
        
    }
   
}

module.exports = {
    //Aca exporto los metodos
    crearSuscriptor
    
  }