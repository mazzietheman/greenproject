const express = require('express')
const MemberController = require('../controllers/Member')
const router = express.Router();

router.post('/member/join', MemberController.join);

router.get('/member', MemberController.findAll);
router.get('/member/:id', MemberController.findOne);
router.post('/member', MemberController.create);
router.patch('/member/:id', MemberController.update);
router.delete('/member/:id', MemberController.destroy);

module.exports = router