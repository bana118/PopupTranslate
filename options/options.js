// 設定画面で保存ボタンを押されたら
function save_options() {
    // 設定値を変数に格納
    var selectText = document.getElementById("selectText").value;
    var fontColor = document.getElementById("fontColor").value;

    // chromeアカウントと紐づくストレージに保存
    chrome.storage.local.set(
        {
            selected_selectText: selectText,
            selected_fontColor: fontColor
        },
        function () {
            // 保存できたら、画面にメッセージを表示(0.75秒だけ)
            var status = document.getElementById("status");
            status.textContent = "Options saved.";
            setTimeout(function () {
                status.textContent = "";
            }, 750);
        }
    );
}

// 設定画面で設定を表示する
function restore_options() {
    // デフォルト値は、ここで設定する
    chrome.storage.local.set(
        {
            selected_selectText: "click",
            selected_fontColor: "#adff2f"
        },
        function (items) {
            document.getElementById("selectText").value = items.selected_selectText;
            document.getElementById("fontColor").value = items.selected_fontColor;
        }
    );
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
