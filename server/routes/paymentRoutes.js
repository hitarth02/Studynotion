const express = require("express");
const router = express.Router();

const { capturePayment , verifyPayment } = require("../controller/payement");
const { auth , isAdmin , isInstructor , isStudent } = require("../middleware/roleAuth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth , isStudent , verifyPayment);

module.exports = router;