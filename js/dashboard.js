const currentPage = new URLSearchParams(location.search).get("page")
const $mainContents = document.querySelectorAll(".main-dashboard-div > div")
const $pageLinks = document.querySelectorAll(".sidebar__pages > a")
const manageItems = document.querySelector(".manage-items")
const userInfo = document.querySelector(".dashboard-user-info > div")
const createSelect = document.querySelector("#post-img-select")
const dashForm = document.querySelector("#dash-form")
const postTitle = document.querySelector(".post-title")
const postImg = document.querySelector(".post-imgg")
const textArea = document.querySelector("#description-area")
const signOut = document.querySelector(".sign-out")



fetch("http://localhost:3000/api/categories")
.then(response=>response.json())
.then(data=>{
    const selectFragment = document.createDocumentFragment()
    data.data.forEach(e=>{
        const option = document.createElement("option")
        option.innerHTML = e._id
        selectFragment.appendChild(option)
        
    })
    createSelect.appendChild(selectFragment)
})

dashForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    fetch("http://localhost:3000/api/posts",{
        method: "POST",
        body: JSON.stringify({
            title: postTitle.value,
            image: postImg.value,
            description: textArea.value,
            category: createSelect.value,
        }),
        headers: {
            "Content-type" : "application/json",
            "Authorization" : "Bearer" + ' ' +localStorage.getItem("user-token")
        }

    })
    .then(response => response.json())
    .then(data => console.log(data))
})



console.log($mainContents);
$pageLinks.forEach(side=>{
    if(side.href.includes(currentPage)){
        side.setAttribute("aria-current", "page")
    }
})





$mainContents.forEach(pages=>{
    if(pages.dataset.contentName.includes(currentPage)){
        pages.style.display = "block"
    }
})

function renderManage(date){
    const {data}= date
    const $fragment = document.createDocumentFragment()
    data.forEach((e,i)=>{
        const div = document.createElement("div")
        div.className = "grid-items"
        div.innerHTML = `
            <img src="${e.image}" alt="">
            <div class="grid__items-content">
                <h3>${e.title.length>30?e.title.slice(0,30)+"...":e.title}</h3>
                <p>${e.description.length>100?e.description.slice(0,100)+"...":e.description}</p>
                <div class="grid-items-buttons">
                    <button data-item-id="${e._id}" id="edit-btn">Edit</button>
                    <button data-item-id="${e._id}" id="delete-btn">Delete</button>
                </div>
            </div>
        `
        $fragment.appendChild(div)
    })
    manageItems.appendChild($fragment)
}

if(currentPage === "manage"){
    axios("http://localhost:3000/api/posts")
    .then(response=>{
        renderManage(response.data)
    })
}


manageItems.addEventListener("click", (e)=>{
    if(e.target.closest("#delete-btn")){
        console.log(localStorage.getItem("delete-id"));
        localStorage.setItem("delete-id", e.target.closest("#delete-btn").dataset.itemId) 
        fetch(`http://localhost:3000/api/posts/${localStorage.getItem("delete-id")}`,{
            method: "DELETE",
            headers:{
                "Authorization" : "Bearer" + " " +localStorage.getItem("user-token")
            }
        })
        location.replace(location.origin + "/pages/dashboard.html?page=manage")
    }
})




signOut.addEventListener("click", ()=>{
    localStorage.removeItem("user-token")
    location.replace(location.origin + "/index.html")
})

