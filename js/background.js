chrome.contextMenus.create({id:"translate",title:"translate:%s",contexts:["selection"]});

chrome.contextMenus.onClicked.addListener(function (info,tab){
    if(info.menuItemId == "translate") {
        const glot = new Glottologist();
        glot.t(info.selectionText, "ja").then(translated => {
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
        });
    }
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var event = request.event;
        if(event == "selectionchange"){

        }
    }
);
