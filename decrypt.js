$("div.js-tweet-text-container > p").each(function () { // To get each individual tweet and decrypt it
    var global = this; // Refer to current object
    var ct = $(global).text();
    chrome.storage.local.get(ct, function (result) { // Retrieve stored cipher text object
        var cipherObj = result[ct]; // get cipher object to decrypt
        if (ct === JSON.parse(cipherObj).ct) { // If the cipher text is the same as the stored object
            chrome.storage.local.get('group', function (result) { // Get key
                var key = result.group.key[0] + ''; // Key needs to be a string
                var decryptedText = sjcl.decrypt(key, cipherObj);
                $(global).text(decryptedText); // Display decrypted message in tweet box
            });
        }
    });
});