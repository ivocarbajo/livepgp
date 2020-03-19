function saveKeys (){
    chrome.storage.local.set({
        privateKeyPassword: document.getElementById("private-key-password").value,
        privateKey: document.getElementById("private-key-textarea").value.split('\n')
    }, function() {
        M.toast({html: 'Private key set!'})
        console.log(document.getElementById("private-key-textarea").value);
    });
}

document.getElementById("save-button").addEventListener("click", (e) => {
    e.preventDefault();
    saveKeys();
});

document.getElementById("pgp-key-form").addEventListener("submit", (e) => {
    e.preventDefault();
    saveKeys();
});

chrome.storage.local.get(['privateKey'], function(result) {
    if (result != '' || typeof result != undefined) {
        document.querySelector('label[for="private-key-textarea"]').setAttribute("class", "active");
        document.getElementById("private-key-textarea").setAttribute("style", "height: 591px;");
    }
    if (typeof result.privateKey !== 'undefined'){
        document.getElementById('private-key-textarea').innerText = result.privateKey.join('\n');
    } else {
        console.log("Live PGP: No PGP private key present");
    }

    M.textareaAutoResize(document.getElementById("private-key-textarea"));
});