var text = $("div.js-tweet-text-container > p").text();
var ct = text.substring(0, text.indexOf("҂"));
var salt = text.substring(text.indexOf("҂")+1,text.indexOf("؏"));
var iv =text.substring(text.indexOf("؏")+1,text.indexOf("௳"));
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
$("div.js-tweet-text-container > p").text(""+decryptedText);