
//var stuff = $("div.js-tweet-text-container <p class=\"TweetTextSize TweetTextSize--normal js-tweet-text tweet-text\" lang=\"en\" data-aria-label-part=\"4\">").text("Blocked");

// var cipherTextJson = {};
// var password = "password";
group ={ // Key Management with JSON object
    "key": "password",
};

$(function () { // Take in input
    $('#keyInput').click(function () {
        if(group.key===$('#keyTextInput').val()){ // Display decrypted tweet if key is correct
            // console.log("CALL");
            
            chrome.tabs.executeScript({
                // code: '$("div.js-tweet-text-container > p").text("'+decryptedText+'")'
                file: 'decrypt.js'
            });
        }else{
            alert("Incorrect decryption key entered");
        }
    });
});

encrypt();

function encrypt(){
    var text = $("div.js-tweet-text-container > p").text(); // .each to get each separate
    var parameters = {
        "iter": 1000
    };
    var rp = {};
    sjcl.misc.cachedPbkdf2(group.key, parameters);
    cipherTextJson = sjcl.encrypt(group.key, text, parameters, rp);

    var parsed = JSON.parse(cipherTextJson);
    console.log(cipherTextJson);
    $("div.js-tweet-text-container > p").text(parsed.ct+"҂"+parsed.salt+"؏"+parsed.iv+"௳"); // Displays cipher text in tweet
    // console.log(parsed);

}