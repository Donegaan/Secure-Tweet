block();
function block(){
    console.log("block called");
    var stuff = $("div.js-tweet-text-container > p").text("Blocked");
}
$(function(){
    $('#keyInput').click(function(){
        $('#test').text($('#input').val());
    });
});

// function getKey(){
//     console.log("get key called");
//     alert(document.getElementById('keyInput').values+" is value");
// }