const express = require('express');
const router = express.Router();
const users = require('../controllers/Users');

router.route('/findUser')
    .get(users.find);

router.route('/signUp')
    .post(users.signUp);

router.route('/loginPass')
    .post(users.loginPass);

router.route('/loginIden')
    .post(users.loginIden);

router.route('/getUserContacts')
    .get(users.getUserContacts);

router.route('/addUserContacts')
    .post(users.addUserContacts);

module.exports = router;

/*

router.route('/logout')
    .post(users.logout);
*/

/*





router.route('/addUser/')
    .post(users.addUser);

router.route('/deleteUser/:username')
    .delete(users.deleteUser);
*/
