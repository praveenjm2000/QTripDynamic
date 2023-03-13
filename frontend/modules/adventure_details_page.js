import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log(search)
  const params = new URLSearchParams(search);
  let id = params.get("adventure");
  //console.log(id);
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{  
    let data = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    let jsondata = await data.json();
    //console.log(jsondata);
    return jsondata;
  }
  catch(e){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure);
  document.getElementById("adventure-name").innerHTML=adventure.name;
  document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;
  adventure.images.forEach(src => {
    let image = document.createElement("img");
    image.setAttribute("src",src);
    image.setAttribute("class","activity-card-image");
    document.getElementById("photo-gallery").appendChild(image);
  })
  document.getElementById("adventure-content").innerText=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carousalDiv = document.createElement("div");
  carousalDiv.setAttribute("class","carousel slide");
  carousalDiv.setAttribute("id","carouselExampleIndicators");
  carousalDiv.setAttribute("data-bs-ride","carousel");
  carousalDiv.innerHTML=`
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`
  let inner = document.createElement("div");
  inner.setAttribute("class","carousel-inner")
  for(let i in images)
  {
    let item = document.createElement("div");
    item.setAttribute("class","carousel-item")
    if(i==0){
      item.setAttribute("class","carousel-item active");
    }
    let image = document.createElement("img");
    image.setAttribute("src",images[i]);
    image.setAttribute("class","activity-card-image");
    item.appendChild(image);
    inner.appendChild(item);
  }
  carousalDiv.appendChild(inner);
  document.getElementById("photo-gallery").innerHTML="";
  document.getElementById("photo-gallery").appendChild(carousalDiv);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log(adventure.available);
  if(adventure.available==true){
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block";
    document.getElementById("reservation-panel-available").style.display="none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead = adventure.costPerHead;
  let totalCost = costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML=totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  //console.log(adventure);
  let form = document.getElementById("myForm");
  form.addEventListener("submit", async function(e){
    e.preventDefault();

    let name = form.elements["name"].value;
    let person = form.elements["person"].value;
    let date = form.elements["date"].value;
    
    //console.log(e.target.date.value);
    
    const update = {
      name: name,
      date: date,
      person: person,
      adventure: adventure.id
    };
    //console.log(update);
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    };

    await fetch(config.backendEndpoint+'/reservations/new', options)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(update => {
        //console.log(update);
        alert("Success!")
        }).catch(e => {
        alert("Failed!");
        //console.log(e);
      });
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
