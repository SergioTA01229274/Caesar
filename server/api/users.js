const crypto = require('crypto');
const db = require('../services/database').database;
const usersCollection = db.collection('users');

async function find(username){
    const userSnapshot = await usersCollection.get();
    let resObj = {msg: 'User not found !', statusCode: 404, data: {}};
    userSnapshot.forEach((doc) => {
        tmpData = doc.data();
        if(String(doc.id) == username){
            resObj.statusCode = 200;
            resObj.msg = "User found !";
            resObj.data = {username: String(doc.id), publicKey: tmpData.publicKey, registerDate: tmpData.registerDate, lastLoginDate: tmpData.lastLoginDate};
        }
    });
    return resObj;
}

async function signUp(name, pass){
    const tmpUserRef = usersCollection.doc(name);
    const tmpPublicKey = crypto.randomBytes(1024).toString('hex');
    const tmpLoginKey = crypto.randomBytes(512).toString('hex');
    let userInfo = {
        password: crypto.createHash('sha256').update(pass).digest('hex'),
        loginKey: tmpLoginKey,
        publicKey: tmpPublicKey,
        registerDate: (new Date()).toString(),
        lastLoginDate: (new Date()).toString(),
        contacts: [],
        online: false
    }
    let queryResponse = await tmpUserRef.set(userInfo);
    return {msg: 'User succesfully added', statusCode: 200, data: queryResponse, userCredentials: {publicKey: tmpPublicKey, loginKey: tmpLoginKey}};
}

async function loginPass(name, pass){
    const userSnapshot = await usersCollection.get();
    let resObj = {msg: 'Cannot login. User not found !', statusCode: 403, data: null};
    let tmpPassHash = null;
    let loginData = null;
    userSnapshot.forEach((doc) => {
        tmpData = doc.data();
        if(String(doc.id) == name){
            resObj.statusCode = 200;
            tmpPassHash = tmpData.password;
            loginData = {publicKey: tmpData.publicKey}
        }
    });
    if(resObj.statusCode == 403){
        return resObj;
    }
    let inputPassHash = crypto.createHash('sha256').update(pass).digest('hex');
    if(String(inputPassHash) != String(tmpPassHash)){
        return {msg: 'Cannot Login. Invalid credentials !', statusCode: 403, data: null}
    }
    return {msg: 'Login succesfully !', statusCode: 200, data: loginData};
}

async function loginIden(name, key){
    const userSnapshot = await usersCollection.doc(name);
    let resObj = {msg: 'Login forbiden. Identity package does not match.', statusCode: 403, data: null};
    let tmpLoginKey = await userSnapshot.get().then((doc) => {
        return doc.data().loginKey;
    });
    if(String(key) != String(tmpLoginKey)){
        return resObj;
    }
    let generalData = null;
    userSnapshot.get().then((doc) => {
        let tmpData = doc.data();
        generalData = {
            lastLoginDate: tmpData.lastLoginDate,
            publicKey: tmpData.publicKey
        }
    });
    userSnapshot.update({online: true, lastLoginDate: (new Date()).toString()});
    return {msg: 'Identity package succesfully matched.', statusCode: 200, data: generalData};
}

module.exports.find = find;
module.exports.signUp = signUp; 
module.exports.loginPass = loginPass;
module.exports.loginIden = loginIden;

/*

}*/