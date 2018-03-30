$("div.js-tweet-text-container > p").each(function () { // To get each individual tweet and decrypt it
    var global = this; // Refer to current object
    var ct = $(global).text();
    // console.log(ct);
    chrome.storage.local.get(ct, function (result) { // Retrieve stored cipher text object
        var cipherObj = result[ct];
        // console.log(cipherObj);
        if (ct === JSON.parse(cipherObj).ct) { // If the cipher text is the same as the stored object
            chrome.storage.local.get('group', function (result) { // Get key
                var key = result.group.key[0] + '';
                var decryptedText = sjcl.decrypt(key, cipherObj);
                // console.log(decryptedText);
                $(global).text(decryptedText); // Display decrypted message in tweet box
            });
        }
    });
});