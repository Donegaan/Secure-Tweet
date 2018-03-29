
group = { // Key Management with JSON object
    "key": "pass",
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

// chrome.storage.local.clear(function() {
//     var error = chrome.runtime.lastError;
//     if (error) {
//         console.error(error);
//     }
// });
$(function (){ // Encypt submitted text
    $('#encryptSubmit').click(function(){
        var encryptText = sjcl.encrypt(group.key,$('#encryptInput').val(),parameters,rp);
        // stack.push(encryptText);
        
        var parsed = JSON.parse(encryptText);
        // console.log(parsed);
        var ct=parsed.ct;
        var obj={};
        obj[ct]=encryptText;
        chrome.storage.local.set(obj, function(){ // Store encrypted json object
            console.log('Value is set to ' + obj+ " CT: "+ct);
        });
        $('#displayEncrypted').text(ct);
        
    });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      console.log('Storage key "%s" in namespace "%s" changed. ' +
                  'Old value was "%s", new value is "%s".',
                  key,
                  namespace,
                  storageChange.oldValue,
                  storageChange.newValue);
    }
});

