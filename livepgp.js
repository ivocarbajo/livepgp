var livepgp = {
    /**
     * Creates badges for messages
     * @param {String} message 
     */
    createBadge: message => {
        var livePgpBadge = document.createElement("span");
        livePgpBadge.style.display = "block";
        livePgpBadge.style.width = "fit-content";
        livePgpBadge.style.marginTop = "5px";
        livePgpBadge.style.padding = "5px";
        livePgpBadge.style.backgroundColor = "#999";
        livePgpBadge.style.borderRadius = "3px";
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
            span.innerHTML.includes("-----BEGIN PGP MESSAGE-----");
    }
}