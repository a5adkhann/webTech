const form = document.getElementById("form");
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


form.addEventListener("submit", (e) => {
    e.preventDefault();

    ValidateInputs();
})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerHTML = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerHTML = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
}

const ValidateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === ""){
        setError(username, 'Username is required')
    }
    else {
        setSuccess(username);
    }

    if(emailValue === ""){
        setError(email, 'Email is required')
    }
    else {
        setSuccess(email);
    }

    if(passwordValue === ""){
        setError(password, 'Password is required')
    }
    else if(passwordValue.length < 8){
        setError(password, "Password must be atleast 8 characters");
    }
    else {
        setSuccess(password);
    }

    if(password2Value === ""){
        setError(password2, 'Please confirm your password')
    }
    else if(password2Value !== passwordValue){
        setError(password2, "Password does not match");
    }
    else {
        setSuccess(password2);
    }

    username.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";

}