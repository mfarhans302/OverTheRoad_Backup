const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/auth');
const CompanyInfoController = require('../controllers/companyInfo');

// POST route to add new company info
router.post('/addInfo', verifyAccessToken,CompanyInfoController.addInfo);
router.delete('/deleteInfo/:id', verifyAccessToken,CompanyInfoController.deleteInfo);
router.put('/update/:id',verifyAccessToken,CompanyInfoController.updateInfo)

module.exports = router;
