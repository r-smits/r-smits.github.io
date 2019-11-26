


function mapretrieval() {
  
  let httpreq = new XMLHttpRequest();

  console.log("hello");

  httpreq.open("GET", "countries-10m.json", false);

  //httpreq.open("GET", "https://github.com/r-smits/r-smits.github.io/blob/master/countries-10m.json", false);
  console.log(httpreq.getAllResponseHeaders());

  httpreq.send();

  let response = httpreq.responseText;

  console.log(response);
  
}

window.onload = mapretrieval();
