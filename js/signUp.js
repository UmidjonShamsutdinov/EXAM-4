const sigUpForm = document.querySelector(".signup-form")
const firstName = document.querySelector(".firstname-input")
const lastName = document.querySelector(".lastname-input")
const emailInp = document.querySelector(".email-input")
const password = document.querySelector(".password-input")
const eyeBtn = document.querySelector("#eye-btn")
const mainRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ 




sigUpForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    axios.post("http://localhost:3000/api/auth/signup", {
        firstname: firstName.value,
        lastname: lastName.value,
        email: emailInp.value,
        password: password.value,
        headers: {
            "Content-type" : "application/json",
        }
    })
    .then(response => {
        const {data} = response   
        console.log(data);     
        location.replace(location.origin + "/pages/login.html")
    })
})