const users = require('../api/users');

async function find(req, res, next){
    try {
        const result = await users.find(req.body.username);
        if (result.statusCode == 404) {
            return res.status(result.statusCode).json({msg: result.msg, data: null});
        } else {
            return res.status(result.statusCode).json({msg: result.msg, data: result.data});
        }
    } catch (err) {
        next(err);
    }
}


async function signUp(req, res, next){
    try {
        const existingUser = await users.find(req.body.username);
        if (existingUser.statusCode == 404) {
            const userAddedResponse = await users.signUp(req.body.username, req.body.password, req.body.rsaObj);
            return res.status(userAddedResponse.statusCode).json({msg: userAddedResponse.msg, data: userAddedResponse.data});
        }
        return res.status(403).json({msg: "Cannot add user. User already exists!", data: null});
    } catch (error) {
        next(error);
    }
}

async function loginPass(req, res, next){
    try {
        const existingUser = await users.find(req.body.username);
        if (existingUser.statusCode == 404) {
            return res.status(403).json({msg: "Cannot login. User not found !", data: null});
        }
        const loginPassResponse = await users.loginPass(req.body.username, req.body.password);
            return res.status(loginPassResponse.statusCode).json({
                msg: loginPassResponse.msg, data: loginPassResponse.data
            });
    } catch (error) {
        next(error);
    }
}

async function loginIden(req, res, next){
    try {
        const loginIdenResponse = await users.loginIden(req.body.username, req.body.loginKey);
        return res.status(loginIdenResponse.statusCode).json({msg: loginIdenResponse.msg, data: loginIdenResponse.data});
    } catch (error) {
        next(error);
    }
}

async function getUserContacts(req, res, next){
    try {
        const userConstacts = await users.getUserContacts(req.params.username);
        return res.status(userConstacts.statusCode).json({msg: userConstacts.msg, data: userConstacts.data});
    } catch (error) {
        next(error);
    }
}

async function addUserContact(req, res, next){
    try {
        const additionResponse = await users.addUserContact(req.body.username, req.body.contactToAdd);
        await users.addUserContact(req.body.contactToAdd, req.body.username);
        return res.status(additionResponse.statusCode).json({msg: additionResponse.msg, data: additionResponse.data});
    } catch (error) {
        next(error);
    }
}

async function updateIP(req, res, next){
    try {
        const ipResponse = await users.updateIP(req.params.username, req.params.ipAddress);
        return res.status(ipResponse.statusCode).json({msg: ipResponse.msg, data: ipResponse.data});
    } catch (error) {
        next(error);
    }
}

async function getUserInfo(req, res, next){
    try {
        const infoResponse = await users.getUserInfo(req.params.username);
        return res.status(infoResponse.statusCode).json({msg: infoResponse.msg, data: infoResponse.data});
    } catch (error) {
        next(error);
    }
}

async function getContactPublicInfo(req, res, next){
    try {
        const publicInfoResponse = await users.getContactPublicInfo(req.params.contact);
        return res.status(publicInfoResponse.statusCode).json({msg: publicInfoResponse.msg, data: publicInfoResponse.data});
    } catch (error) {
        next(error);
    }
}

module.exports.find = find;
module.exports.signUp = signUp;
module.exports.loginPass = loginPass;
module.exports.loginIden = loginIden;
module.exports.getUserContacts = getUserContacts;
module.exports.addUserContact = addUserContact;
module.exports.updateIP = updateIP;
module.exports.getUserInfo = getUserInfo;
module.exports.getContactPublicInfo = getContactPublicInfo;