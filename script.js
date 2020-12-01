const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';
const BASE_DETAIL_URL='https://www.themoviedb.org/movie/';
const BASE_SEARCH_URL='https://api.themoviedb.org/3/search/multi?api_key=0ccb2dfb03eb9d440dba766b3eb18584&language=en-US&page=1&include_adult=false&query=';

var topRatedMovies;
var searchBar;
var suggestionList=document.getElementById('suggestions');



//OnCreate

    getMovies();
    searchBar=document.querySelector('#searchDam');
    searchBar.oninput=()=>{
        if(searchBar.value.length>0){
            search(searchBar.value);
            console.log(searchBar.value)
        }
    }

    console.log(searchBar);




function getMovies() {
    //AJAX CALL 
    //Load movies when ready 
    var xmh = new XMLHttpRequest();
    xmh.onload = () => {
        topRatedMovies = JSON.parse(xmh.responseText);
        console.log(topRatedMovies.results);
        console.log(topRatedMovies.results[0].title);
        loadMoviesIntoCarousel();
        loadMoviesIntoDestaque();
        loadMoviesIntoNovidades();
    }

    xmh.onerror = (err) => {
        console.log("Error: " + err);
    }

    xmh.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=0ccb2dfb03eb9d440dba766b3eb18584');
    xmh.send();

}

function loadMoviesIntoCarousel() {
    let carouselLanc = document.getElementById('carouselLanc');
    let activeItem = 'active';



    for (let i = 1; i < 7; i++) {

        let item = `<div class="carousel-item ${activeItem}">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <img class="movieBanner" src="${BASE_IMG_URL + topRatedMovies.results[i].poster_path}" alt="banner" width="100%" height="400px" />
                    </div>
        
                    <div class="col-sm-12 col-md-6">
                        <h2>${topRatedMovies.results[i].title}</h2>
                        <p><b>Sinopse:</b>${topRatedMovies.results[i].overview}</p>
        
                    <div class="lancamentoInfo">
                        <div class="row">
                            <div class="col-xs-6 col-lg-4">
                                <b>Estreia:</b>${topRatedMovies.results[i].release_date}
                            </div>
                        </div>

                        <div style="margin-top: 16px;"><b>Avaliação media:</b></div>
                        <div>${topRatedMovies.results[i].vote_average}</div>
                        <a style='color:blue' href='${BASE_DETAIL_URL+topRatedMovies.results[i].id}'>Mais detalhes</a> 
                    </div>
                        
        
                    </div>
        
                </div>
        
            </div>
        </div>`;
        carouselLanc.innerHTML += item;
        activeItem = '';
    }



}


function loadMoviesIntoDestaque() {
    let destaquesRow = document.getElementById('destaquesRow');
  
    for (let i = 15; i <19; i++) {
        destaquesRow.innerHTML += `
            <div class="col-3">
            <div class="card destaque-card">
            <a href='${BASE_DETAIL_URL+topRatedMovies.results[i].id}'>
                <img class="card-img-top" src="${BASE_IMG_URL + topRatedMovies.results[i].poster_path}" alt="Card image">
            </a>
            </div>
        </div>`;

    }


}


function loadMoviesIntoNovidades(){
    let novidadesRow=document.getElementById('novidadesRow');

    for(let i=10;i<topRatedMovies.results.length;i++){

        novidadesRow.innerHTML+=`
        <div class="row" style="margin-top: 20px;">
        <div class="card" style="max-width: 600px;">
            <div class="row no-gutters">
                <div class="col-sm-5 col-md-4">
                    <img src="${BASE_IMG_URL + topRatedMovies.results[i].poster_path}" class="card-img-top" alt="...">
                </div>
                <div class="col-sm-7 col-md-6" >
                    <div class="card-body">
                        <h5>${topRatedMovies.results[i].title}</h5>
                        <p>${topRatedMovies.results[i].overview.substring(0,topRatedMovies.results[i].overview.length-(topRatedMovies.results[i].overview.length/2))}</p>
                        <a style='color:gray; align-self:bottom; font-size:16px;' href='${BASE_DETAIL_URL+topRatedMovies.results[i].id}'>Ver detalhes</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }

}


function search(keyWord){
  
    let listRes;
    let x=new XMLHttpRequest();
    x.open('GET',BASE_SEARCH_URL+`&query=${keyWord}`);
    x.send();

    x.onload=()=>{
        listRes = JSON.parse(x.responseText);
        for(let i=0;i<listRes.results.length;i++){
            suggestionList.innerHTML+=`<option>${listRes.results[i].title}</option>`;
            if(i>15){break;}
        }
    }

    x.onerror=(err)=>{
        console.log("Error: "+err);
    }

}
