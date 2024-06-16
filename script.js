const API_KEY = "975c10ebf7dc445ca6405da2785060f5";
const url = "https://newsapi.org/v2/everything?q=";

let DATA_ARRAY = [];//articles

//use to fetch data from news api 
async function fetchData(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // console.log(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    return data;

    // DATA_ARRAY = [...data.articles]
}

fetchData("all").then(data => renderMain(data.articles));

//menu button setting
let mobileMenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");

let menuBtnDisplay = true;

// side menu toogle effect for mobile use
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

//--------->>Render news
function renderMain(arr) {
    let mainHTML = '';
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].urlToImage){
        mainHTML += `<div class="card">
        <a href=${arr[i].url}>
        <img src=${arr[i].urlToImage} lazy="loading" />
        <h4>${arr[i].title}</h4>
        <div class="publishbyDate">
        <p>${arr[i].source.name}</p>
        <span>•</span>
        <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
        </div>
        <div class="desc">
        ${arr[i].description}
        </div>
        </a>
        </div>`
       }
    }

document.querySelector("main").innerHTML=mainHTML;
}

// searching bar code
const searchBtn = document.getElementById("searchForm")
const searchBtmMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile")
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault();
    console.log(searchInput.value);

    const data = await fetchData(searchInput.value);
    renderMain(data.articles);
})
searchBtmMobile.addEventListener("submit",async(e)=>{
    e.preventDefault();
    console.log(searchInputMobile.value);
    
    const data = await fetchData(searchInputMobile.value);
    renderMain(data.articles);
})

// active side elements
async function Search(query){
    const data = await fetchData(query);
    renderMain(data.articles);
}




