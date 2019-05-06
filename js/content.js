/* Listen for messages */
var element = document.createElement("header");
element.id = "TranslateModalExtensionHeader";
var objBody = document.getElementsByTagName("body").item(0);
objBody.appendChild(element);
objBody.addEventListener("click",function (){
    element.style.display = "none";
}, false);
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command == "translate")) {
        element.innerHTML = msg.text;
        element.style.display = "inline-block";
        sendResponse("translate:"+msg.text);
    }
});