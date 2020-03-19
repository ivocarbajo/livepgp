async function encryptText(text){
    if(typeof text === 'string' && text.length !== 0){
        chrome.storage.local.get(['encryptFor'], async result => {
            if (result.encryptFor.length != 0){    
                var publicKeys = await Promise.all(result.encryptFor.map(async (key) => {
                    return (await openpgp.key.readArmored(key)).keys[0];
                }));
        
                openpgp.encrypt({
                    message: openpgp.message.fromText(text),
                    publicKeys: publicKeys,
                }).then(encrypted => {
                    var encryptedText = encrypted.data;
                    encryptedText = encryptedText.replace(encryptedText.slice(27, 88), '');
                    navigator.clipboard.writeText(encryptedText);
                    M.toast({html: `LivePGP: The selected text was encrypted, it's on your clipboard!`});
                });
            } else {
                M.toast({html: `LivePGP: No public keys were selected, so nothing was encrypted. ¯\\_(ツ)_/¯`});
            }
        });
    } else {
        M.toast({html: `LivePGP: Nothing was selected, so nothing was encrypted. ¯\\_(ツ)_/¯`});
    }
}

document.addEventListener("keydown", function (e) {
    if (e.ctrlKey &&  e.shiftKey  &&  (e.key === "e" || e.key === "E")) {        
        encryptText(window.getSelection().toString());
    }
});
