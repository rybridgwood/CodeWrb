const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(input.value))){
        //true email
        showSuccess(input)
    }else{
        showError(input, "Email is not valid!")
    }
}

//Check required fields

function checkRequired(inputArr){
    inputArr.forEach(input => {
        console.log(input.value);

        if(input.value.trim() ===""){
            showError(input, `${input.id.capitalize()} is required`);
        }else{
            showSuccess(input)
        }
    });
}

//Check Length
function checkLength(input, min, max){

    if (input.value.length < min){
        showError(input,`Must be at least ${min} characters`);
        } else if(input.value.length > max){
            showError(input,`Must be no more than ${max} characters`);
        }else{
            showSuccess(input)
        }
}

//Check password match
function checkPasswordsMatch(p1, p2){
    if(p1.value !== p2.value){
        showError(p2, "Password do not match!");
    }

}


//Event Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();

       checkRequired([username,email,password,password2]);
       checkLength(username, 3, 15);
       checkLength(password, 6, 25);
       checkEmail(email);
       checkPasswordsMatch(password, password2);
       

       

});