
// var decryptedText;

$("div.js-tweet-text-container > p").each(function () { // To get each individual tweet and decrypt it
    var global = this; // Refer to current object
    var ct = $(global).text();

    chrome.storage.local.get('ct', function(result){ // Retrieve stored cipher text object
        var cipherObj = result.ct;
        decryptedText = sjcl.decrypt(group.key,cipherObj).substring(0, decryptedText.indexOf("pic.twitter.com"));

        console.log(decryptedText);
        $(global).text(decryptedText); // Display decrypted message in tweet box
    });
});
