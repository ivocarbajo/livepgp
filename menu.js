M.AutoInit();

var elems = document.querySelectorAll('.collapsible');
var instances = M.Collapsible.init(elems);

chrome.storage.local.get(['publicKeys', "encryptFor"], (result) => {
    if (typeof result.publicKeys === 'undefined' || result.publicKeys == null) {
        chrome.storage.local.set({
            publicKeys: [],
            encryptFor: typeof encryptFor === 'undefined' ? [] : encryptFor
        }, (result) => {

        });
    } else if(result.publicKeys.length == 0) {
        M.toast({html: 'Set public keys on the "Import a public key" section'});
    } else {
        result.publicKeys.forEach(publicKey => {
            var label = document.createElement("label");
            var checkboxWrapper = document.createElement("p");
            var checkbox = document.createElement("input");
            checkbox.classList.add("pubkeyCheckbox");
            if(result.encryptFor.includes(publicKey.value)) checkbox.setAttribute("checked", "");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("key", publicKey.value);
            var span = document.createElement("span");
            span.innerHTML = publicKey.nickname;
            label.appendChild(checkbox);
            label.appendChild(span);
            checkboxWrapper.appendChild(label);
            document.getElementById("select-pub-keys").appendChild(checkboxWrapper);
        });
    }
});

document.getElementById("import-public-key-form").addEventListener("submit" ,(e) => {
    e.preventDefault();
    chrome.storage.local.get(['publicKeys'], (result) => {
        result.publicKeys.push({
            value: document.getElementById('public-key-ifield').value,
            nickname: document.getElementById('public-key-nickname-ifield').value
        });
        
        chrome.storage.local.set({
            publicKeys: result.publicKeys
        }, (result) => {
            M.toast({html: 'Public key added! Reloading...'});
            setTimeout(() => {
                location.reload();
            }, 1000);
        });
    });
});

document.getElementById("use-public-key-form").addEventListener("submit" ,(e) => {
    e.preventDefault();
    var pubkeys = [];
    document.querySelectorAll(".pubkeyCheckbox").forEach(checkbox => {
        if (checkbox.checked){
            pubkeys.push(checkbox.getAttribute("key"));
        }
    });

    chrome.storage.local.set({
        encryptFor: pubkeys
    }, () => {
        M.toast({html: 'Public keys set!'})
    });
});

chrome.storage.local.get(['privateKey'], (result) => {
    if (typeof result.privateKey !== 'undefined' || result.privateKey == null || result.privateKey == ''){
        document.querySelectorAll('a[href="options.html"]').forEach((element) => {
            element.classList.add("pulse");
        });
    }
});