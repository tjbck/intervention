// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   // read changeInfo data and do something with it (like read the url)
//   if (changeInfo.url) {
//     // do something here
//     chrome.tabs.sendMessage(tabId, {
//       message: "urlChange",
//       url: changeInfo.url,
//     });
//   }
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   console.log(message, sender);
//   if (message.action == "survey") {
//     chrome.tabs.create({ url: chrome.runtime.getURL("pages/index.html") });
//     sendResponse("Gotcha!");
//   }
// });
