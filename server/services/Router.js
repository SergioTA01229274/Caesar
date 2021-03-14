const express = require('express');
const router = express.Router();
const users = require('../controllers/Users');


router.route('/hello').get(() => {
    console.log("Hello world !");
});

router.route('/findUser')
    .get(users.find);

router.route('/signUp')
    .post(users.signUp);

router.route('/loginPass')
    .post(users.loginPass);

router.route('/loginIden')
    .post(users.loginIden);

module.exports = router;
/*

router.route('/getUser/:username')
    .get(users.getUser);



router.route('/addUser/')
    .post(users.addUser);

router.route('/deleteUser/:username')
    .delete(users.deleteUser);
*/
