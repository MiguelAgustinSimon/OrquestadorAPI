const { Router } = require("express");
const verificarToken=require('../middlewares/VerificarToken');

const router = Router();
const {
    createCustomerUserCorpCustomer
}=require("../controllers/UserCorpCustomer");


//Aca genero las rutas que llamo del controller

//Rutas GET
router.post("/createCustomerUserCorpCustomer/:clicod/:cuit/:email",verificarToken, createCustomerUserCorpCustomer);


//Rutas POST


module.exports = router;