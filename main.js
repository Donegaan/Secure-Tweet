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
    console.log(cipherTextJson);
    $("div.js-tweet-text-container > p").text(""+cipherTextJson);

    var decryptedText = sjcl.decrypt(password, cipherTextJson);
    console.log(decryptedText);
}

// function getKey(){
//     console.log("get key called");
//     alert(document.getElementById('keyInput').values+" is value");
// }

