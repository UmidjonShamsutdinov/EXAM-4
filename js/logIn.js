const sigUpForm = document.querySelector(".signup-form")
const emailInp = document.querySelector(".email-input-log")
const password = document.querySelector(".password-input")
const eyeBtn = document.querySelector("#eye-btn")




sigUpForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    axios.post("http://localhost:3000/api/auth/login", {
        email: emailInp.value,
        password: password.value,
        headers: {
            
            "Content-type" : "application/json",
        },
    })
    .then(response => {
        if(response.status === 200){
            const {data} = response      
            console.log(data);  
            localStorage.setItem("user-token", data.token)
            location.replace(location.origin +"/pages/dashboard.html")
        }else{
            console.log("error")
        }
        
        
    })
})







