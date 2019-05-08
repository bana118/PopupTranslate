console.log("test");
var fontColor;
chrome.storage.local.get(null, function (items) {
	fontColor = items.selected_fontColor;
});
/* Listen for messages */
var element = document.createElement("header");
document.body.appendChild(element);
element.id = "TranslateModalExtensionHeader";

document.body.addEventListener("click", function () {
	element.style.display = "none";
}, false);


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.command && (msg.command == "translate")) {
		element.style.color = fontColor;
		element.innerHTML = msg.text;
		element.style.display = "inline-block";
		sendResponse("translate:" + msg.text);
	}
});

