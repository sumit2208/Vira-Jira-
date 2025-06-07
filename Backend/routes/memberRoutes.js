const express = require("express")
const router = express.Router()

const {createMembers} = require("../controllers/membersController")

router.post("/createMembers",createMembers)



module.exports = router;