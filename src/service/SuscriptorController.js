//https://stackabuse.com/making-http-requests-in-node-js-with-node-fetch/s
const fetch = require('cross-fetch');

const getSubscriberCorpEntities = async (req, res) => {
    
   try {
        const res = await fetch('https://accounts.errepar.com/subscribers/api/getSubscriberCorpEntities?clicod=445540');
    
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
    
        const user = await res.json();
    
        console.log(user);
      } catch (err) {
        console.error(err);
      }

   
}



module.exports = {
    //Aca exporto los metodos
    getSubscriberCorpEntities
    
  }