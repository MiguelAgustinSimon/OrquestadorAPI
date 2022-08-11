const { Router } = require("express");
const verificarToken=require('../middlewares/VerificarToken');

const router = Router();
const {
    getCustomerUserCorpCustomer
}=require("../controllers/UserCorpCustomer");


//Aca genero las rutas que llamo del controller

//Rutas GET
router.get("/getCustomerUserCorpCustomer",verificarToken, getCustomerUserCorpCustomer);


module.exports = router;