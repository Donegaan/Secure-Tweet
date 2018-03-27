$("div.js-tweet-text-container > p").each(function () { // To get each individual tweet
    var text = $(this).text();
    var ct = text.substring(0, text.indexOf("҂"));
    var salt = text.substring(text.indexOf("҂") + 1, text.indexOf("؏"));
    var iv = text.substring(text.indexOf("؏") + 1, text.indexOf("௳"));
    console.log("text: " + text + " ct: " + ct + " salt: " + salt + " iv: " + iv);
    cipherTweet = {
        "iv": iv,
        "v": 1,
        "iter": 1000,
        "ks": 128,
        "ts": 64,
        "mode": "ccm",
        "adata": "",
        "cipher": "aes",
        "salt": salt,
        "ct": ct
    };
    var cipherJson = JSON.stringify(cipherTweet);
    console.log(cipherJson);
    var decryptedText = sjcl.decrypt(group.key, cipherJson);
    var displayText = decryptedText.substring(0, decryptedText.indexOf("pic.twitter.com"));
    $(this).text("" + displayText);
});