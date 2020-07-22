window.addEventListener('load', function() {
    var passwordLength = prompt("Choose length of password from 8-128");
  
    while (passwordLength < 8 || passwordLength > 128) {
        passwordLength = prompt("Choose value 8-128 please!!");
    }
  
    var confirmNumber = confirm("Include numbers?");
    var confirmSpecial = confirm("Include special characters?");
    var confirmUpper = confirm("Include uppercase letters?");
    var confirmLower = confirm("Include lowercase letters?");
          
    while (!(confirmNumber || confirmSpecial || confirmUpper || confirmLower)) {
      alert("Please choose one or more character types!");
  
      confirmNumber = confirm("Include numbers?");
      confirmSpecial = confirm("Include special characters?");
      confirmUpper = confirm("Include uppercase letters?");
      confirmLower = confirm("Include lowercase letters?");
    }
  
    //DOM elements
    const resultEl = document.getElementById('password');
  
    document.getElementById('generate').addEventListener('click', () => {
      resultEl.value = generatePassword(confirmNumber, confirmSpecial, confirmLower, confirmUpper, passwordLength);
    });
  
    document.getElementById('clipboard').addEventListener('click', () => {
      const textarea = document.createElement('textarea');
      const password = resultEl.value;
  
      if (!password) {
        return;
      }
  
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      alert('Password copied to clipboard');
    });
  });
  
  
  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    special: getRandomSymbol
  };
  
  function generatePassword(lower, upper, number, special, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + special;
    const typesArr = [{
      lower
    }, {
      upper
    }, {
      number
    }, {
      special
    }].filter(item => Object.values(item)[0]);
  
    // create a loop
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
  
    const finalPassword = generatedPassword.slice(0, length);
  
    return finalPassword;
  }
  
  // Generator functions
  function getRandomLower() {
    return rando("abcdefghijklmopqrstuvwxyz")
  }
  
  function getRandomUpper() {
    return rando("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }
  
  function getRandomNumber() {
    return rando(9);
  }
  
  function getRandomSymbol() {
    return rando('!@#$%^&*(){}[]=<>/,.');
  }