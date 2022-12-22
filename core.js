
var script = document.createElement('script');
(document.head || document.documentElement).appendChild(script);
var alert = {"alert": "url changed"}

//Get URL
var url_href = window.location.href;
var url_hostname = window.location.hostname;
sendURL();


try {
  script.onload = function(){
    console.log(script + ' loaded!');
  };
} catch (error) {
  console.log("ERROR", error)
}

script.src =  chrome.runtime.getURL('script.js');


window.receiveMessage = function(e){
  warnBackground(e.data);
}

window.addEventListener("message", receiveMessage, false);



function warnBackground(data){
  data.url = url_hostname;
  chrome.runtime.sendMessage(data)
}

function sendURL() {
  console.log("URL CHANGED");
  chrome.runtime.sendMessage(alert)
};
