chrome.contextMenus.create({id:"translate",title:"translate:%s",contexts:["selection"]});

chrome.contextMenus.onClicked.addListener(function (info,tab){
    if(info.menuItemId == "translate") {
        const glot = new Glottologist();
        const splitSelectionText = info.selectionText.split(".");
        for(i=0;i<splitSelectionText.length-1;i++) {
            splitSelectionText[i] += ".";
        }
        const promiseArray = splitSelectionText.map(text=>
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
        })
        /*glot.t(info.selectionText, "ja").then(translated => {
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
        });*/
    }
});

