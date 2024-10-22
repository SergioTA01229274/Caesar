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

router.route('/getUserContacts/:username?')
    .get(users.getUserContacts);

router.route('/getUserInfo/:username?')
    .get(users.getUserInfo);

router.route('/getContactPublicInfo/:contact?')
    .get(users.getContactPublicInfo);


router.route('/addUserContact')
    .post(users.addUserContact);

router.route('/updateIP/:username?/:ipAddress?')
    .post(users.updateIP);



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
