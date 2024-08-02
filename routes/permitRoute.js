const express = require('express')
const router = express.Router();
const permitLogController = require('../controllers/PermitLogController');
const { verifyAccessToken } = require('../middlewares/auth');


router.post('/add',verifyAccessToken,permitLogController.addPermitLogBook)
router.delete('/:id',verifyAccessToken,permitLogController.deletePermitLogBook);
router.put('/update/:id',verifyAccessToken, permitLogController.updatePermitLogBook);



module.exports = router;