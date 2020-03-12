openpgp.config.ignore_mdc_error = true; //ignore mdc errors (force decrypt)
var privkey;
var privkeyPassword;

//Get private key and credentials
chrome.storage.sync.get(['privateKey', 'privateKeyPassword'], result => {
    privkey = result.privateKey.join("\n");
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
        }
    });
}, 5000);
