// Assignment Code
var generateBtn = document.querySelector("#generate");

//variables that i am adding in array
var char_list = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var myUppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "w", "X", "Y", "Z"];
var myNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var myCharacters = ["@", "%", "+", "/", "!", "#", "$", "^", "?", ":", ",", "(", ")", "{", "}", "[", "]", "~"];

var passLength = prompt("How many characters for your password? choose 8-128");
//console.log(promptResponse);

alert("you chose a password of " + passLength + " characters");
//alert(promptResponse);

var confirmLower = confirm("Do you want to use lowercase?");
alert (confirmLower);


var confirmUpper = confirm("Do you want to use uppercase?");
alert (confirmUpper);

var confirmNumbers = confirm("Do you want to use numbers?");
alert (confirmNumbers);

var confirmSpecial = confirm("Do you want to use special characters?");
alert (confirmSpecial);

//maybe this
function generatePassword() {
    var length = passLength,
        charsetAll = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678@%,+/!#$^?:,(){}[]~"
        charsetLower = "abcdefghijklmnopqrstuvwxyz";
        charsetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        charsetNumbers = "0123456789";
        charsetSpecial = "@%,+/!#$^?:,(){}[]~";
        retVal = "";

        //if lower is true else no lower case just upper, num, and special
    for (var i = 0, n = charsetAll.length; i < length; ++i) {
        if(confirmLower === true) {
            retVal += charsetLower.charAt(Math.floor(Math.random() * n)) + charsetUpper.charAt(Math.floor(Math.random() * n)) + charsetNumbers.charAt(Math.floor(Math.random() * n))
            + charsetSpecial.charAt(Math.floor(Math.random() * n));        //yes lower, prints lower,upper,num,special
        } else if (confirmLower === false){
            retVal += charsetUpper.charAt(Math.floor(Math.random() * n)) + charsetNumbers.charAt(Math.floor(Math.random() * n))
            + charsetSpecial.charAt(Math.floor(Math.random() * n));     //no lower,  prints upper,num,special
        } else if (confirmNumbers === true) {
              retVal += charsetNumbers.charAt(Math.floor(Math.random() *n));   //yes num, prints 
        } else if (confirmNumbers === false){
              retVal += charsetLower.charAt(Math.floor(Math.random() * n)) + charsetSpecial.charAt(Mathfloor(Math.random() * n)) 
              + charsetUpper.charAt(Mathfloor(Math.random() * n));    //no num, prints
        
        }  else if (confirmSpecial === true) {
              retVal =+ charsetSpecial.charAt(Math.floor(Math.random() * n));
        }  else if (confirmSpecial === false) {
            retVal =+ charsetNumbers.charAt(Math.floor(Math.random() * n)) + charsetLower.charAt(Math.floor(Math.random() * n))
            + charsetUpper.charAt(Math.floor(Math.random() * n));
          }
          
}
       
    

    return retVal;
}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);