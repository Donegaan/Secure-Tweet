// block();

// function block() {
//     var stuff = $("div.js-tweet-text-container > p").text("Blocked");
// }
$(function () {
    $('#keyInput').click(function () {
        $('#test').text($('#input').val());
    });
});

testEncrypt();

function testEncrypt() { // Using sjcl encryption library
    var password = "password";
    var text = $("div.js-tweet-text-container > p").text();
    // var text = "test stuff";
    // console.log(text);
    var parameters = {
        "iter": 1000
    };
    var rp = {};
    var cipherTextJson = {};
    

    sjcl.misc.cachedPbkdf2(password, parameters);
    cipherTextJson = sjcl.encrypt(password, text, parameters, rp);
    var parsed = JSON.parse(cipherTextJson);
    $("div.js-tweet-text-container > p").text("" + parsed.ct); // Displays cipher text in tweet

    var decryptedText = sjcl.decrypt(password, cipherTextJson);

    console.log(decryptedText);
     
        // Layout of cipherJson
        // cipherTextJson={
    //     "iv":"tjp81jkAzUpW1bI9gLDDpg==", // iv Base64 encoded
    //     "v":1,                           // version
    //     "iter":1000,                     // iteration count
    //     "ks":128,                        // key size in bits
    //     "ts":64,                         // authentication strength
    //     "mode":"ccm",                    // mode
    //     "adata":"xxx",                   // authenticated data
    //     "cipher":"aes",                  // cipher
    //     "salt":"lx06UoJDNys=",           // key derivation salt
    //     "ct":"Gv7ptKdTtUz6AGtX"          // ciphet text
    //     };
}

// function getKey(){
//     console.log("get key called");
//     alert(document.getElementById('keyInput').values+" is value");
// }