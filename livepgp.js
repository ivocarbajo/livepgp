var livepgp = {
    /**
     * Creates badges for messages
     * @param {String} message 
     */
    createBadge: message => {
        var livePgpBadge = document.createElement("span");
        livePgpBadge.classList.add("live-pgp-badge");
        livePgpBadge.innerText = "Live PGP: " + message;
    
        return livePgpBadge;
    },

    /**
     * Parses messages to be decrypted
     * @param {String} message 
     */
    parseEncryptedMessage: message => {
        var result = "";
        result = "-----BEGIN PGP MESSAGE-----";
        result += message.split("-----BEGIN PGP MESSAGE-----")[1].split("-----END PGP MESSAGE-----")[0];
        result += "-----END PGP MESSAGE-----";
        return result;
    },

    /**
     * Checks if the message is in a correct PGP format
     * @param {String} span 
     */
    checkDecryptable: span => {
        return !span.hasAttribute("decrypted") && 
            span.innerHTML.includes("-----BEGIN PGP MESSAGE-----") && 
            span.innerHTML.includes("-----END PGP MESSAGE-----") &&
            span.getAttribute("data-text") != true;
    }
}