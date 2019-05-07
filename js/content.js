/*var selectText;
var fontColor;
chrome.storage.local.get(null, function (items) {
    selectText = items.selected_selectText;
    fontColor = items.selected_fontColor;
});*/
/* Listen for messages */
var element = document.createElement("header");
element.id = "TranslateModalExtensionHeader";

/*document.body.addEventListener("selectionchange", function () {
    chrome.runtime.sendMessage(
        { event: "selectionchange" }
    );
}, false);*/

document.body.addEventListener("click", function () {
    element.style.display = "none";
}, false);


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.command && (msg.command == "translate")) {
        element.innerHTML = msg.text;
        element.style.display = "inline-block";
        sendResponse("translate:" + msg.text);
    }
});

