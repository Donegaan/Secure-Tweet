// Chrome local storage is used throughout for storing values

var parameters = {
    "iter": 1000
};
var rp = {};

$(function () { // Take in input
    $('#keyInput').click(function () {
        chrome.storage.local.get('group', function (result) {
            var key = result.group.key[0] + '';
            if (key === $('#keyTextInput').val()) { // Display decrypted tweet if key is correct
                chrome.tabs.executeScript({
                    // code: '$("div.js-tweet-text-container > p").text("'+decryptedText+'")'
                    file: 'decrypt.js'
                });
            } else {
                alert("Incorrect decryption key entered");
            }
        });
    });

    $('#encryptSubmit').click(function () { // Encypt submitted text
        chrome.storage.local.get('group', function (result) {
            var key = result.group.key[0] + '';
            if (key == null) {
                alert("No group key found");
            } else { // Valid key so encrypt
                var encryptText = sjcl.encrypt(key, $('#encryptInput').val(), parameters, rp);
                // stack.push(encryptText);

                var parsed = JSON.parse(encryptText);
                // console.log(parsed);
                var ct = parsed.ct;
                var obj = {};
                obj[ct] = encryptText;
                chrome.storage.local.set(obj, function () { // Store encrypted json object
                    console.log('Value is set to ' + obj + " CT: " + ct);
                });
                $('#displayEncrypted').text(ct);
            }
        });
    });

    $('#groupInput').click(function () { // Add user to group

        // console.log(randKey);
        var name = $('#groupTextInput').val();
        console.log(name);
        chrome.storage.local.get('group', function (result) { // Get group info
            var groupInfo = result.group;
            if (groupInfo == null) { // If group isn't found
                var randKey = sjcl.random.randomWords(1, 0); // Create key
                // console.log(randKey);
                groupInfo = {
                    'key': randKey,
                    'users': [name]
                };
                console.log('No group: ' + groupInfo);
            } else { // Group found
                groupInfo.users.push(name);
                console.log('group found');
            }
            chrome.storage.local.set({
                'group': groupInfo
            }, function () { // Store changed info
                console.log('Group is set to ' + groupInfo);
            });
        });
    });

    $('#groupRemove').click(function () { // remove user from group
        var name = $('#groupTextInput').val();
        chrome.storage.local.get('group', function (result) { // Get group info
            var groupInfo = result.group;
            if (groupInfo == null) { // If group isn't found
                alert('No group');
            } else {
                var users = groupInfo.users;
                var index = users.indexOf(name);
                if (index > -1) { // if username found
                    console.log("USER FOUND");
                    users.splice(index, 1); // Remove user name
                    groupInfo.users=users;
                    groupInfo.key = sjcl.random.randomWords(1, 0); // Create new key since group has changed
                    chrome.storage.local.set({'group':groupInfo}); // Resave new group
                }else{
                    alert("Username not in group");
                }
            }
        });
    });

    $('#getKeyInput').click(function () { // Return group key
        chrome.storage.local.get('group', function (result) { // Get group info
            var groupInfo = result.group;
            if (groupInfo == null) { // If group isn't found   
                console.log("No group found");
            } else {
                var users = groupInfo.users;
                var name = $('#groupTextInput').val();
                var index = users.indexOf(name);
                if (index > -1) {
                    console.log("NAME MATCH");
                    $('#giveKey').text(groupInfo.key);
                }
            }
        });
    });

    $('#CryptoTab').click(function () { // Display crypto tab html
        var tabcontent;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        document.getElementById('Crypto').style.display = "block";
    });

    $('#GroupTab').click(function () { // Display group tab html
        var tabcontent;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        document.getElementById('Group').style.display = "block";
    });
});

function getKey() {
    chrome.storage.local.get('group', function (result) {
        var group = result.group;
        return group.key[0];
    });
}