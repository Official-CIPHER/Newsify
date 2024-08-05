const API_KEY = "c09e7066d6bb86abab2437b0dccc0e11";
const url = "https://gnews.io/api/v4/search?q=";

let DATA_ARRAY = []; // Articles

// Use to fetch data from GNews API
async function fetchData(query, page = 1) {
    const response = await fetch(`${url}${query}&token=${API_KEY}&page=${page}&max=50`);
    const data = await response.json();
    return data;
}

// Fetch up to 100 articles
async function fetchAllNews(query) {
    let allArticles = [];
    const maxPages = 2; // Number of pages to request

    for (let page = 1; page <= maxPages; page++) {
        const data = await fetchData(query, page);
        if (data.articles) {
            allArticles = allArticles.concat(data.articles);
        }
    }

    return allArticles;
}

fetchAllNews("all").then(articles => renderMain(articles));

// Menu button setting
let mobileMenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");

// Side menu toggle effect for mobile use
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Render news
function renderMain(arr) {
    let mainHTML = '';
    arr.forEach(article => {
        if (article.image) {
            mainHTML += `
            <div class="card">
                <a href="${article.url}" target="_blank">
                    <img src="${article.image}" alt="${article.title}" lazy="loading" />
                    <h4>${article.title}</h4>
                    <div class="publishbyDate">
                        <p>${article.source.name}</p>
                        <span>•</span>
                        <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
                    </div>
                    <div class="desc">
                        ${article.description}
                    </div>
                </a>
            </div>`;
        }
    });

    document.querySelector("main").innerHTML = mainHTML;
}

// Searching bar code
const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const articles = await fetchAllNews(searchInput.value);
    renderMain(articles);
});

searchBtnMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const articles = await fetchAllNews(searchInputMobile.value);
    renderMain(articles);
});

// Active side elements
async function Search(query) {
    const articles = await fetchAllNews(query);
    renderMain(articles);
}
