const mainSingle = document.querySelector(".main-single-content")

const itemId = new URLSearchParams(location.search).get("itemId");
const signLogIn = document.querySelector(".sign-log-in")
const userInfoo = document.querySelector(".user-info-local")
axios.get(`http://localhost:3000/api/posts/${itemId}`).then(response=>renderPost(response.data))

const token =localStorage.getItem("user-token")
if(token){
    signLogIn.style.display = "none"
    userInfoo.style.display = "flex"
}else{
    signLogIn.style.display = "flex"
    userInfoo.style.display = "none"
}


function renderPost(resp){
    console.log(resp);
    mainSingle.innerHTML = `
        <div class="item-content">
            <div class="item-intro">
                <h2 title="${resp.title}">${resp.title.length>45?resp.title.slice(0,45)+"...":resp.title}</h2>
                <p title="${btoa(resp.category)}">${btoa(resp.category).slice(0,1)+"..."}</p>
            </div>
            <img src="${resp.image}" alt="">
            <p>${resp.description}</p>
        </div>
    `

}