function findSIN(event){
    event.preventDefault();

    const SIN_NUMBER_LENGTH = 9;
    const SIN_NUMBER = document.querySelector("#sin input").value.toLowerCase();    

    if(containX(SIN_NUMBER)){
        if(inputIsFilled(SIN_NUMBER,SIN_NUMBER_LENGTH)){
            const SIN_NUMBER_SEPARATED = Array.from(SIN_NUMBER);
            let totalSum = 0;
            let checkDigit;
            let xIsCheckDigit = false;
            let doubleX = false;
            let xValue;

            SIN_NUMBER_SEPARATED.forEach((number,index)=> { 
                let currentNumber = number;

                if((index + 1) == SIN_NUMBER_LENGTH){
                    if(currentNumber == "x"){
                        xIsCheckDigit = true;
                    }else{
                        checkDigit = parseInt(currentNumber);
                    }
                }else{
                    if(isEven(index + 1)){
                        if(currentNumber == "x"){
                            currentNumber = 0;
                            doubleX = true;
                        }else{
                            let numberTwoDigits;
                            currentNumber = currentNumber * 2;
                            
                            if(numberHasTwoDigits(currentNumber)){
                                numberTwoDigits = Array.from(currentNumber.toString());
        
                                currentNumber = parseInt(numberTwoDigits[0]) + parseInt(numberTwoDigits[1]);
                            }else{
                                currentNumber = parseInt(currentNumber);
                            }
                        }                
                    }else{
                        if(currentNumber == "x"){
                            currentNumber = 0;
                        }else{
                            currentNumber = parseInt(currentNumber);
                        }
                    }

                    totalSum += currentNumber;
                }            
            });

            if(xIsCheckDigit){
                xValue = (-totalSum % 10) + 10;

                alert("The x is the check digit and the value is: "+xValue);
            }else{
                if(doubleX){
                    xValue = (-(((totalSum % 10) + checkDigit) % 10) + 10) / 2;
                }else{
                    xValue = -(((totalSum % 10) + checkDigit) % 10) + 10;
                }

                xValue = Math.round(xValue);
                
                alert("The x value is: "+xValue);
            }
        }else{
            alert("The input is not filled properly.");
        }
    }else{
        alert("There is no 'x' to find.");
    }
}

function findUPC(event){
    event.preventDefault();

    const UPC_NUMBER_LENGTH = 12;    
    const UPC_NUMBER = document.querySelector("#upc input").value.toLowerCase();    

    if(containX(UPC_NUMBER)){
        if(inputIsFilled(UPC_NUMBER,UPC_NUMBER_LENGTH)){
            let UPC_NUMBER_SEPARATED = Array.from(UPC_NUMBER);
            let totalSum = 0;
            let checkDigit;
            let xIsCheckDigit = false;
            let tripleX = false;
            let xValue;

            UPC_NUMBER_SEPARATED.forEach((number,index)=> {
                let currentNumber = number;

                if((index + 1) == UPC_NUMBER_LENGTH){
                    if(currentNumber == "x"){
                        xIsCheckDigit = true;
                    }else{
                        checkDigit = parseInt(currentNumber);
                    }
                }else{
                    if(!isEven(index + 1)){
                        if(currentNumber == "x"){
                            currentNumber = 0;
                            tripleX = true;
                        }else{
                            currentNumber = parseInt(currentNumber) * 3;
                        }                
                    }else{
                        if(currentNumber == "x"){
                            currentNumber = 0;
                        }else{
                            currentNumber = parseInt(currentNumber);
                        }
                    }

                    totalSum += currentNumber;
                }            
            });

            if(xIsCheckDigit){
                xValue = -(totalSum % 10) + 10;
                
                alert("The x is the check digit and the value is: "+xValue);
            }else{
                xValue = -(((totalSum % 10) + checkDigit) % 10) + 10;

                alert("The x value is: "+xValue);
            }
        }else{
            alert("The input is not filled properly.");
        }
    }else{
        alert("There is no 'x' to find.");
    }
}

function findISBN(event){
    event.preventDefault();

    const ISBN_NUMBER_LENGTH = 10;    
    const ISBN_NUMBER = document.querySelector("#isbn input").value.toLowerCase();    

    if(containX(ISBN_NUMBER)){
        if(inputIsFilled(ISBN_NUMBER,ISBN_NUMBER_LENGTH)){
            let ISBN_NUMBER_SEPARATED = Array.from(ISBN_NUMBER);
            let totalSum = 0;
            let checkDigit;
            let xIsCheckDigit = false;
            let xMultiplication;
            let xValue;
            let foundX = false;

            ISBN_NUMBER_SEPARATED.forEach((number,index)=> {
                let currentNumber = number;

                if((index + 1) == ISBN_NUMBER_LENGTH){
                    if(currentNumber == "x"){
                        if(foundX){
                            checkDigit = 10;
                        }else{
                            xIsCheckDigit = true;
                        }
                    }else{
                        checkDigit = parseInt(currentNumber);
                    }
                }else{
                    if(currentNumber == "x"){
                        currentNumber = 0;
                        xMultiplication = index + 1;
                        foundX = true;
                    }else{
                        currentNumber = currentNumber * (index+1);
                    }
                    totalSum += currentNumber;
                }            
            });

            if(xIsCheckDigit){
                xValue = ((totalSum % 11 == 10) ? "X" : totalSum % 11);
                
                alert("The x is the check digit and the value is: "+xValue);
            }else{
                let congruentNumber = (checkDigit - (totalSum % 11));

                while(congruentNumber%xMultiplication != 0){
                    congruentNumber = congruentNumber + 11;
                }                

                xValue = congruentNumber / xMultiplication;

                alert("The x value is: "+xValue);
            }
        }else{
            alert("The input is not filled properly.");
        }
    }else{
        alert("There is no 'x' to find.");
    }
}

function validateInput(ths,event){
    let pressedKey = event.key.toLowerCase();

    if(!isNumeric(pressedKey) && !isFirstX(pressedKey,ths.value) && !isSpecialKey(pressedKey)){
        event.preventDefault();
    }
}

function validateISBNInput(ths,event){
    let pressedKey = event.key.toLowerCase();

    if(!isNumeric(pressedKey) && !isFirstX(pressedKey,ths.value) && !xIsCheckDigit(pressedKey,ths.value) && !isSpecialKey(pressedKey)){
        event.preventDefault();
    }
}

function isNumeric(key) {
    return !isNaN(parseFloat(key)) && isFinite(key);
}

function isFirstX(key,input){
    return key == "x" && input.split("x").length == 1;
}

function xIsCheckDigit(key,input){
    if(input.length == 9){
        if(key == "x"){
            return true;    
        }           
    }
}

function isSpecialKey(key){
    return key == "backspace" || key == "arrowleft" || key == "arrowright" || key == "delete";
}

function containX(input){
    return input.indexOf("x") != -1;
}

function isEven(number){
    return number % 2 == 0;
}

function inputIsFilled(input,max){
    return input.length == max;
}

function numberHasTwoDigits(number){
    return number.toString().length == 2;
}