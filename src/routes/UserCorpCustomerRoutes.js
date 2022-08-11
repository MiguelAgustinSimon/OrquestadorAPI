const { Router } = require("express");
const verificarToken=require('../middlewares/VerificarToken');

const router = Router();
const {
    getCustomerUserCorpCustomer,
    getUsersFromSubscriberCorpEntities,
    assignUserSubscriberCorpEntities
}=require("../controllers/UserCorpCustomer");


//Aca genero las rutas que llamo del controller

//Rutas GET
router.get("/getCustomerUserCorpCustomer/:clicod",verificarToken, getCustomerUserCorpCustomer);
router.get("/getUsersFromSubscriberCorpEntities/:clicod",verificarToken, getUsersFromSubscriberCorpEntities);

//Rutas POST
router.post("/assignUserSubscriberCorpEntities",verificarToken, assignUserSubscriberCorpEntities);

module.exports = router;