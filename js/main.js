var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
  });



const swiperWrapper = document.querySelector(".swiper-wrapper")
const signLogIn = document.querySelector(".sign-log-in")
const userInfoo = document.querySelector(".user-info-local")
axios("http://localhost:3000/api/posts",{
  headers:{
    "Content-type":"application/json"
  }
}).then(response => {
    const {data} = response
    render(data)
})


const token =localStorage.getItem("user-token")
if(token){
    signLogIn.style.display = "none"
    userInfoo.style.display = "flex"
}else{
    signLogIn.style.display = "flex"
    userInfoo.style.display = "none"
}


function render(resp){
    const fragmentItems = document.createDocumentFragment()
    
    resp.data.forEach(e=>{
        console.log(e);
        const div = document.createElement("div")
        div.className = "swiper-slide"
        div.innerHTML = `
            <a href="../pages/singlePost.html?itemId=${e._id}">
                <img src="${e.image}" alt="img">
                <div class="swiper-slide-content">
                    <h2 title="${e.title}">${e.title.length>20?e.title.slice(0,20)+"...": e.title}</h2>
                    <p title="${e.description}">${e.description.length>80?e.description.slice(0,80)+"...": e.description}</p>                    
                    <div class="user-info">
                        <img src="./images/user-ingo-img.svg" alt="">
                        <div>
                            <p>Ibrokhim Jalalov</p>
                            <p>Author</p>
                        </div>
                    </div>
                </div>
            </a>
            
        `
        fragmentItems.appendChild(div)
    })
    swiperWrapper.appendChild(fragmentItems)
}


// e.description.length>50?e.description.slice(0,25)+"...": e.description