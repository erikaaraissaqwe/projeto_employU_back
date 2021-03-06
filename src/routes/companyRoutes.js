const router = require("express").Router();
const companyController = require("../controllers/CompanyController");
const authMiddleware = require('../middlewares/Auth');

router.post("/loginCheck", companyController.login);

router.post("/register", companyController.register);

router.use("/vagas", authMiddleware.privateCompany, require("./companyJobRoutes"));

module.exports = router;