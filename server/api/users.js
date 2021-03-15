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

async function getUserContacts(username){
    const userSnapshot = await usersCollection.doc(username);
    let resObj = {msg: 'No contacts found. User has not added any contact.', statusCode: 404, data: null};
    let contactsArr = await userSnapshot.get().then((doc) => {
        return doc.data().contacts;
    });

    if(contactsArr.length > 0){
        resObj.msg = `${username} has ${contactsArr.length} contacts !`;
        resObj.statusCode = 200;
        resObj.data = {userContacts: contactsArr};
    }
    return resObj;
}

async function addUserContacts(username, contactsToAdd){
    const userSnapshot = await usersCollection.doc(username);
    let resObj = {msg: 'No contacts added !', statusCode: 400, data: null};
    if(contactsToAdd.length == 0){
        return resObj;
    }
    let contactsArr = await userSnapshot.get().then((doc) => {
        return doc.data().contacts;
    });

    let individualRes = '';
    let flag = false;
    for (let i = 0; i < contactsToAdd.length; i++) {
        if(contactsArr.includes(contactsToAdd[i])){
            continue;
        }
        flag = true;
        let tmpExistingVer = await find(contactsToAdd[i]);
        if(tmpExistingVer.statusCode != 404){
            contactsArr.push(contactsToAdd[i]);
            individualRes += `${contactsToAdd[i]}\t added!\n`;
            continue;
        }
    individualRes += `${contactsToAdd[i]}\t not added!\n`; 
    }
    console.log(individualRes);
    userSnapshot.update({contacts: contactsArr});
    return {msg: (flag ? 'No errors when trying to add contacts': 'Cannot add contacts entered.'), statusCode: (flag ? 200: 400), data: (flag ? individualRes: null)};
}

module.exports.find = find;
module.exports.signUp = signUp; 
module.exports.loginPass = loginPass;
module.exports.loginIden = loginIden;
module.exports.getUserContacts = getUserContacts;
module.exports.addUserContacts = addUserContacts;