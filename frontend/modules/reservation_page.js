import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let data = await fetch(config.backendEndpoint+"/reservations");
    let jsondata = await data.json();
    return jsondata;
  }
  catch(e){
    return null;
  }


  // Place holder for functionality to work in the Stubs
  //return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length>0){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display="block";
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display="none";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  reservations.forEach(e => {
    let op1 = {day: 'numeric', year: 'numeric', month: 'numeric'};
    let op2 = {day: 'numeric', month: 'long', year:'numeric', hour:'numeric', minute:'numeric', second:'numeric'};
    let date = new Date(e.date);
    date = date.toLocaleDateString("en-IN");
    let time = new Date(e.time);
    time = time.toLocaleString('en-IN',op2);
    time=time.replace(" at", ",")
    console.log(time);
    let tr = document.createElement("tr");
    tr.innerHTML=`
    <td>${e.id}</td>
    <td>${e.name}</td>
    <td>${e.adventureName}</td>
    <td>${e.person}</td>
    <td>${date}</td>
    <td>${e.price}</td>
    <td>${time}</td>
    <td id=${e.id}>
      <a class="reservation-visit-button" href="../detail/?adventure=${e.adventure}">Visit Adventure</a>
    </td>
    `
    document.getElementById("reservation-table").appendChild(tr);
  })
}

export { fetchReservations, addReservationToTable };
