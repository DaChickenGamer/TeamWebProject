// Variables
const technologyBtn = document.getElementById("technologynews");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// Apis
const API_KEY = "c82ca53c2fdf48408bf519e3d0f502f4"
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
const SEARCH_NEWS = 
// const GAMING_NEWS = "https://newsapi.org/v2/top-headlines?q=gaming&apiKey=c82ca53c2fdf48408bf519e3d0f502f4"

// Api Documentation : https://newsapi.org/docs/endpoints/top-headlines
technologyBtn.addEventListener("click", function(){
    fetchTechnologyNews();
});
searchBtn.addEventListener("click", function(){
    fetchQueryNews();
});

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300)
    {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    }
    else 
    {
        // Error Handle
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchQueryNews = async () => {
    if(newsQuery.value == null)
    {
        return;
    }
    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300)
    {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else
    {
        // Error Handle
        console.log(response.status, response.statusText);

    }
    
    displayNews();
}

function displayNews()
{
    newsdetails.innerHTML = "";

    if(newsDataArr.length == 0)
    {
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    newsDataArr.forEach(news =>)
    {
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card"

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
    };
}