function sleep(num) {
    return new Promise(r => setTimeout(r, num));
}
function translate(glottologist, text) {
    return glottologist.t(text, "ja")
}
async function asyncTranslate(glottologist, textArray) {
    var result = "";
    for (const t of textArray) {
        await sleep(500);
        const translatedText = await translate(glottologist, t);
        console.log(translatedText);
        result += translatedText;
    }
    return result;
}

chrome.contextMenus.create({ id: "translate", title: "translate:%s", contexts: ["selection"] });

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "translate") {
        const glot = new Glottologist();
        const splitSelectionText = info.selectionText.split(/(?<=[\.\!\?])/g);
        asyncTranslate(glot, splitSelectionText).then(translated => {
            console.log(translated);
            var queryInfo = {
                active: true,
                windowId: chrome.windows.WINDOW_ID_CURRENT
            };
            chrome.tabs.query(queryInfo, function (result) {
                var currentTab = result.shift();
                var message = {
                    command: "translate",
                    text: translated
                };
                chrome.tabs.sendMessage(currentTab.id, message, function (response) {
                    console.log(response);
                });
            });
        });
        /*const promiseArray = splitSelectionText.map(text=>
            glot.t(text, "ja")
        );
        Promise.all(promiseArray).then(function(translatedArray) {
            const translated = translatedArray.join("");
            console.log(translated);
            var queryInfo = {
                active: true,
                windowId: chrome.windows.WINDOW_ID_CURRENT
            };
            chrome.tabs.query(queryInfo, function (result) {
                var currentTab = result.shift();
                var message = {
                    command: "translate",
                    text: translated
                };
                chrome.tabs.sendMessage(currentTab.id, message, function(response){
                    console.log(response);
                });
            });
        })*/
    }
});

