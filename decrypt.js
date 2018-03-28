$("div.js-tweet-text-container > p").each(function () { // To get each individual tweet
    // var text = $(this).text();
    // console.log(stack);
    var cipherJson=stack.shift();
    // console.log(cipherJson);
    var decryptedText = sjcl.decrypt(group.key, cipherJson);
    var displayText = decryptedText.substring(0, decryptedText.indexOf("pic.twitter.com")); // Remove the pic link from the text
    $(this).text("" + displayText);
});