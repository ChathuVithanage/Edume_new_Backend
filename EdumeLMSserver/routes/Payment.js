const express = require("express")

const {
  uploadSlip,
  
} = require('../controllers/paymentController')

const router = express.Router()

// login route
router.post('/upload', uploadSlip)

module.exports = router
