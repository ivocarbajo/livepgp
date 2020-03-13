openpgp.config.ignore_mdc_error = true; //ignore mdc errors (force decrypt)
var privkey;
var privkeyPassword;

//Get private key and credentials
chrome.storage.sync.get(['privateKey', 'privateKeyPassword'], result => {
    if (typeof result.privateKey !== 'undefined'){
        privkey = result.privateKey.join("\n");
    } else {
        console.log("Live PGP: No PGP private key present");
    }
    privkeyPassword = result.privateKeyPassword;
});

/**
 * Decrypts a message
 * @param {String} message 
 */
async function decrypt(message){
    const keyObject = (await openpgp.key.readArmored(privkey)).keys[0];
    await keyObject.decrypt(privkeyPassword);

    const options = {
        message: await openpgp.message.readArmored(message),
        privateKeys: [keyObject]
    }

    return openpgp.decrypt(options);
}

setInterval(() => {
    document.querySelectorAll('span').forEach((span) => {
        if (livepgp.checkDecryptable(span)){
            if(typeof privkey !== 'undefined'){
                decrypt(livepgp.parseEncryptedMessage(span.innerHTML)).then(text => {
                    span.innerHTML = text.data;
                    span.setAttribute("decrypted", true);
                    span.append(livepgp.createBadge("Decrypted"));
                }).catch(err => {
                    span.setAttribute("decrypted", false);
                    if (err.message == "Error decrypting message: Session key decryption failed.") {
                        span.append(livepgp.createBadge("No private key"));
                    }
                });
            } else {
                span.append(livepgp.createBadge("No pgp keys imported"));
            }
        }
    });
}, 5000);
