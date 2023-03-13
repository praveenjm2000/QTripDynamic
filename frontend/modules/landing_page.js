import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let data = await fetch(config.backendEndpoint+"/cities");
    let arr = await data.json()
    //console.log(arr);
    return arr;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let rowdiv = document.getElementById("data");
  let col = document.createElement("div");
  //col.setAttribute("class","col-sm-6");
  col.setAttribute("class","col-sm-6 col-md-3 mb-4");
  let tile = document.createElement("a");
  tile.setAttribute("class","tile text-center");
  tile.setAttribute("id",id);
  tile.setAttribute("href","pages/adventures/?city="+id)
  let tileimg = document.createElement("img");
  tileimg.setAttribute("src",image);
  let tileText = document.createElement("div");
  tileText.setAttribute("class","tile-text d-flex flex-column justify-content-center");
  let cityDiv = document.createElement("h6")
  cityDiv.innerText=city;
  let descriptionDiv = document.createElement("p");
  descriptionDiv.innerText=description;
  tileText.append(cityDiv,descriptionDiv);
  tile.append(tileimg,tileText);
  col.appendChild(tile);
  rowdiv.appendChild(col);
  
}

export { init, fetchCities, addCityToDOM };
