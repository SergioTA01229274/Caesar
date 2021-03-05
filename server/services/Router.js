const express = require('express');
const router = express.Router();

router.route('/hello').get(() => {
    console.log("Hello world !");
});

module.exports = router;
/*const users = require('../controllers/Users');

router.route('/getUser/:username')
    .get(users.getUser);

router.route('/login')
    .post(users.login);

router.route('/addUser/')
    .post(users.addUser);

router.route('/deleteUser/:username')
    .delete(users.deleteUser);
*/
