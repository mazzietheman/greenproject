const express = require('express')
const MemberController = require('../controllers/Member')
const router = express.Router();

router.post('/member/join', MemberController.join);

module.exports = router