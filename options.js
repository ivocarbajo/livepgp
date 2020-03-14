function message(messageText) {
    document.getElementById("message-text").innerText = messageText;
    document.getElementById("message-container").removeAttribute("hidden");
    setTimeout(() => {
        document.getElementById("message-container").setAttribute("hidden", '');
    }, 5000);
}

function saveKeys (){
    chrome.storage.sync.set({
        privateKeyPassword: document.getElementById("private-key-password").value,
        privateKey: document.getElementById("private-key-textarea").value.split('\n')
    }, function() {
        message("PGP Private key updated");
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

chrome.storage.sync.get(['privateKey'], function(result) {
    if (result != '' || typeof result != undefined) {
        document.querySelector('label[for="private-key-textarea"]').setAttribute("class", "active");
        document.getElementById("private-key-textarea").setAttribute("style", "height: 591px;");
    }
    if (typeof result.privateKey !== 'undefined'){
        document.getElementById('private-key-textarea').innerText = result.privateKey.join('\n');
    } else {
        console.log("Live PGP: No PGP private key present");
    }
});