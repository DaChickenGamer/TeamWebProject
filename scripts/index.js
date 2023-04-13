// Variables
const techNews = document.getElementById("technology");
const minecraftBtn = document.getElementById("minecraft");
const gamingBtn = document.getElementById("gaming");
const generalBtn = document.getElementById("news");
const newsType = document.getElementById("newsType");
const newsQuery = document.getElementById("newsQuery");
const newsdetails = document.getElementById("newsdetails");
var currentNewsType = document.getElementById("news");

currentNewsType.classList.toggle("active");

// Array
var newsDataArr = [];

// Apis 
/*
 Search with singular keywords, or surround complete phrases with quotation marks for exact-match: q=tesla or q="elon musk"
 Specify words which must appear in articles, and words that must not, to remove irrelevent results: q=gamestop +stonks -sell
 Boolean operators AND / OR / NOT and brackets are supported so you can do this: q=(crypto AND bitcoin) NOT ethereum
 Limit your search specifically within titles, or content: qInTitle="title search"
 */
const API_KEY = "3e72a56d294040c1b1a85d9ce5f18ef8";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&sortBy=publishedAt&pageSize=20&apiKey=";
const MINECRAFT_NEWS = "https://newsapi.org/v2/everything?q=minecraft&language=en&pageSize=20&sortBy=publishedAt&apiKey="
const GAMING_NEWS = "https://newsapi.org/v2/everything?language=en&q=gaming&pageSize=20&sortBy=publishedAt&apiKey="
const GENERAL_NEWS = "https://newsapi.org/v2/everything?language=en&q=indie +game&pageSize=8&sortBy=publishedAt&apiKey="


window.onload = function() {
    if (window.location.pathname === "/articles.html"){
    newsType.innerHTML="<h4>Gaming</h4>";
    fetchGamingNews();

    techNews.addEventListener("click",function(){
        newsType.innerHTML="<h4>Technology</h4>";
        fetchTechNews();
        currentNewsType.classList.toggle("active");
        currentNewsType = techNews;
        currentNewsType.classList.toggle("active");
    });
    
    gamingBtn.addEventListener("click",function(){
        newsType.innerHTML="<h4>Gaming</h4>";
        fetchGamingNews();
        currentNewsType.classList.toggle("active");
        currentNewsType = gamingBtn;
        currentNewsType.classList.toggle("active");
    });
    
    minecraftBtn.addEventListener("click",function(){
        newsType.innerHTML="<h4>Minecraft</h4>";
        fetchMinecraftNews();
        currentNewsType.classList.toggle("active");
        currentNewsType = minecraftBtn;
        currentNewsType.classList.toggle("active");
    });
    }
    else if (window.location.pathname === "/index.html"){
        newsType.innerHTML="<h4>Home<h4">
        fetchGeneralNews();

        generalBtn.addEventListener("click",function(){
            newsType.innerHTML="<h4>HOME</h4>";
            fetchGeneralNews();
            currentNewsType.classList.toggle("active");
            currentNewsType = generalBtn;
            currentNewsType.classList.toggle("active");
        });
    }
};


const fetchTechNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchGamingNews = async () => {
    const response = await fetch(GAMING_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}


const fetchMinecraftNews = async () => {
    const response = await fetch(MINECRAFT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}
const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

function displayNews() {

    newsdetails.innerHTML = "";

    // if(newsDataArr.length == 0) {
    //     newsdetails.innerHTML = "<h5>No data found.</h5>"
    //     return;
    // }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}