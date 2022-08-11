const { Router } = require("express");
const verificarToken=require('../middlewares/VerificarToken');

const router = Router();
const {
    crearSuscriptor
}=require("../controllers/Orquestador");


//Aca genero las rutas que llamo del controller

//Rutas GET
router.get("/crearSuscriptor", crearSuscriptor);


module.exports = router;