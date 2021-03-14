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
            const userAddedResponse = await users.signUp(req.body.username, req.body.password);
            return res.status(userAddedResponse.statusCode).json({msg: userAddedResponse.msg, data: userAddedResponse.userCredentials});
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
                msg: loginPassResponse.msg, data: loginPassResponse.userCredentials
            });
    } catch (error) {
        next(error);
    }
}

async function loginIden(req, res, next){
    try {
        const loginIdenResponse = await users.loginIden(req.body.username, req.body.loginKey);
        return res.status(loginIdenResponse.statusCode).json({msg: loginIdenResponse.msg, data: null});
    } catch (error) {
        next(error);
    }
}

module.exports.find = find;
module.exports.signUp = signUp;
module.exports.loginPass = loginPass;
module.exports.loginIden = loginIden;