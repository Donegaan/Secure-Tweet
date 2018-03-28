// var cipherTextJson = {};
// var password = "password";
group = { // Key Management with JSON object
    "key": "password",
};
var stack=[];
var parameters = {
    "iter": 1000
};
var rp = {};

$(function () { // Take in input
    $('#keyInput').click(function () {
        if (group.key === $('#keyTextInput').val()) { // Display decrypted tweet if key is correct
            chrome.tabs.executeScript({
                // code: '$("div.js-tweet-text-container > p").text("'+decryptedText+'")'
                file: 'decrypt.js'
            });
        } else {
            alert("Incorrect decryption key entered");
        }
    });
});

$(function (){ // Encypt submitted text
    $('#encryptSubmit').click(function(){
        var encryptText = sjcl.encrypt(group.key,$('#encryptInput').val(),parameters,rp);
        // stack.push(encryptText);
        
        var parsed = JSON.parse(encryptText);
        var ct=parsed.ct;
        chrome.storage.local.set({ct : encryptText}, function(){ // Store encrypted json object
            console.log('Value is set to ' + encryptText+ " CT: "+ct);
        });
        $('#displayEncrypted').text(ct);
    });
});


