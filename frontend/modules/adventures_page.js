
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //console.log(search);
  const params = new URLSearchParams(search);
  let city = params.get('city');
  //console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{  
    let data = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    let jsondata = await data.json();
    //console.log(jsondata);
    return jsondata;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowdiv = document.getElementById("data");
  //console.log(adventures)
  adventures.forEach(element => {
    let id=element.id;
    let category=element.category;
    let costPerHead=element.costPerHead;
    let currency=element.currency;
    let duration=element.duration;
    let image = element.image;
    let name = element.name;    
    
    let col = document.createElement("div");
    col.setAttribute("class","col-6 col-lg-3 mb-4")
    let card = document.createElement("a");
    card.setAttribute("class","activity-card")
    card.setAttribute("id",id)
    card.setAttribute("href",`./detail/?adventure=${id}`)
    card.innerHTML=`
    <div class="category-banner">${category}</div>
    <img src="${image}">
      <div class="d-flex justify-content-between px-3 pt-2 align-items-center flex-wrap">
        <div class="card-title m-0">${name}</div>
        <div class="card-text">${currency} ${costPerHead}</div>
      </div>
      <div class="card-body d-flex justify-content-between px-3 pb-2 align-items-center">
        <div class="card-title m-0">Duration</div>
        <div class="card-text">${duration} Hours</div>
      </div>`;
      col.appendChild(card);
      rowdiv.appendChild(col);

  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newlist=[]
  list.forEach(ele =>
  {
    if(ele.duration>=low && ele.duration<=high){
      newlist.push(ele)
    }
  });
  return newlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newlist=[]
  list.forEach(ele =>
  {
    categoryList.forEach(cat => 
      {
        if(ele.category==cat){
          newlist.push(ele)
        }
      });
  });
  return newlist;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(list);
   console.log(filters);
   if(filters.category.length>0){
    //console.log("catfilt");
    list = filterByCategory(list,filters.category);
   }
   if(filters.duration!=''){
    //console.log("durfilt");
    let darray = filters.duration.split('-');
    list = filterByDuration(list,darray[0],darray[1]);
   }

  // // Place holder for functionality to work in the Stubs
  console.log(list)
   return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let filters= JSON.parse(window.localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categories = filters.category;
  let d = document.getElementById("category-list");

  categories.forEach(cat => {
    let pill = document.createElement("div");
    pill.innerText=cat;
    pill.setAttribute("class","category-filter");
    d.appendChild(pill)
  });

  let durationValue=filters.duration;
  document.getElementById("duration-select").value = durationValue;

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
