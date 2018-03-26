
//var stuff = $("div.js-tweet-text-container <p class=\"TweetTextSize TweetTextSize--normal js-tweet-text tweet-text\" lang=\"en\" data-aria-label-part=\"4\">").text("Blocked");

var cipherTextJson = {};
// var password = "password";
group ={ // Key Management with JSON object
    "key": "password",
    "emails":{

    }
};

$(function () { // Take in input
    $('#keyInput').click(function () {
        $('#test').text($('#input').val()); // Take input string
        if(group.key===$('#input').val()){ // Display decrypted tweet if key is correct
            // console.log("CALL");
            var decryptedText = sjcl.decrypt(group.key, cipherTextJson);
            chrome.tabs.executeScript({
                code: '$("div.js-tweet-text-container > p").text("'+decryptedText+'")'
            });
        }else{
            alert("Incorrect decryption key entered");
        }
    });
});

encrypt();

function encrypt(){
    var text = $("div.js-tweet-text-container > p").text();
    var parameters = {
        "iter": 1000
    };
    var rp = {};
    sjcl.misc.cachedPbkdf2(group.key, parameters);
    cipherTextJson = sjcl.encrypt(group.key, text, parameters, rp);
    var parsed = JSON.parse(cipherTextJson);
    $("div.js-tweet-text-container > p").text("" + parsed.ct); // Displays cipher text in tweet
    
    // return cipherTextJson;
}