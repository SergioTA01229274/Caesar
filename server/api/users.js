const crypto = require('crypto');
const db = require('../services/database').database;
const usersCollection = db.collection('users');

async function find(username){
    const userSnapshot = await usersCollection.get();
    let resObj = {msg: 'User not found !', statusCode: 404, data:null};
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

async function signUp(name, pass, rsaObj){
    const tmpUserRef = await usersCollection.doc(name);
    const tmpLoginKey = crypto.randomBytes(512).toString('hex');
    let userInfo = {
        password: crypto.createHash('sha256').update(pass).digest('hex'),
        loginKey: tmpLoginKey,
        rsaObj: {e: rsaObj.e, n: rsaObj.n, d: rsaObj.d},
        publicKey: crypto.randomBytes(512).toString('hex'),
        registerDate: (new Date()).toString(),
        lastLoginDate: (new Date()).toString(),
        contacts: [],
        ipAddress:''
    }
    await tmpUserRef.set(userInfo);
    return {msg: 'User succesfully added', statusCode: 200, data: {publicKey: rsaObj, loginKey: tmpLoginKey}};
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
            publicKey: tmpData.publicKey,
            registerDate:  tmpData.registerDate,
            ipAddress: tmpData.ipAddress,
            contacts: tmpData.contacts
        }
    });
    await userSnapshot.update({lastLoginDate: (new Date()).toString()});
    return {msg: 'Identity package succesfully matched.', statusCode: 200, data: generalData};
}

async function getUserContacts(username){
    const userSnapshot = await usersCollection.get();
    let resObj = {msg: 'No contacts found. User has not added any contact.', statusCode: 404, data: null};
    var contactsArr = null;
    userSnapshot.forEach((doc) => {
        let tmpData = doc.data();
        if(String(username) == String(doc.id)){
            contactsArr = tmpData.contacts;
        }
    });
    resObj.msg = `${username} has ${contactsArr.length} contacts !`;
    resObj.statusCode = 200;
    resObj.data = {userContacts: contactsArr};
    if(contactsArr.size == 0){
        resObj.data = null;
    }
    return resObj;
}

async function addUserContact(username, contactToAdd){
    let resObj = {msg: 'Contact not added !', statusCode: 400, data: null};
    if(contactToAdd == ''){
        return resObj;
    }
    const userSnapshot = await usersCollection.get();
    let contactsArr = [];
    userSnapshot.forEach((doc) => {
        let tmpData = doc.data();
        if(String(username) == String(doc.id)){
            contactsArr = tmpData.contacts;
        }
    });
    let tmpExistingVer = await find(String(contactToAdd));
    var responseMsg = '';
    if(tmpExistingVer.statusCode != 404 && contactsArr.indexOf(contactToAdd) == -1){
        contactsArr.push(contactToAdd);
        responseMsg = `${contactToAdd} added to ${username} contacts list`;
        const tmpSnapshot = await usersCollection.doc(username);
        await tmpSnapshot.update({contacts: contactsArr});
        return {msg: responseMsg, statusCode: 200, data: {contactsUpdated: contactsArr}};
    }
    return {msg: `No modifications on ${username} contacts list`, statusCode: 400, data: {contactsUpdated: contactsArr}};
}

async function updateIP(username, newIP){
    const userSnapshot = await usersCollection.get();
    let userIP = '';
    userSnapshot.forEach((doc) => {
        let tmpData = doc.data();
        if(String(username) == String(doc.id)){
            userIP = tmpData.ipAddress;
        }
    });
    if(String(userIP) == String(newIP)){
        return {msg: 'No changes applied on IP address', statusCode: 200, data: newIP};
    }
    await usersCollection.doc(username).update({ipAddress: newIP});
    return {msg: 'IP address changed successfully', statusCode: 200, data: newIP};
}

async function getUserInfo(username){
    const userSnapshot = await usersCollection.get();
    let userInfo = {};
    userSnapshot.forEach((doc) => {
        let tmpData = doc.data();
        if(String(username) == String(doc.id)){
            userInfo.rsaObj = tmpData.rsaObj;
            userInfo.lastLoginDate = tmpData.lastLoginDate;
            userInfo.registerDate = tmpData.registerDate;
        }
    });
    return {msg: 'Use wisely user info', statusCode: 200, data: userInfo};
}

async function getContactPublicInfo(contact){
    const userSnapshot = await usersCollection.get();
    let contactInfo = {};
    userSnapshot.forEach((doc) => {
        let tmpData = doc.data();
        if(String(contact) == String(doc.id)){
            contactInfo.ipAddress = tmpData.ipAddress;
            contactInfo.lastLoginDate = tmpData.lastLoginDate;
            contactInfo.publicKey = tmpData.rsaObj;
        }
    });
    return {msg: 'Contact information gotten successfully', statusCode: 200, data: contactInfo};
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