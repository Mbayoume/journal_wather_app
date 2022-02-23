/* Global Variables */

// select the button to creat the event listner
const button = document.getElementById("generate");
// const zip = document.getElementById("zip").value;
// API base url
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
//API key
const APIkey = "&appid=a57ad7fd7be6a8b4c0be2904194811fc&units=metric";
// Create a new date instance dynamically with JS
let locationDate = new Date();
let newDate = locationDate.toDateString(); //turning the date into the string format

button.addEventListener("click", performData);

// start the action function
function performData(e) {
  // get the user data
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  // start the chaining promis to post that called data into the server

  getWeatherData(baseURL, zip, APIkey).then(function (data) {
    //store the object in a variable
    const weatherInfo = {
      locationDate: newDate,
      city: data.name,
      tempreture: Math.round(data.main.temp),
      feeling: feelings,
    };

    postWeatherData("/postData", weatherInfo);
    updateUIweather();
  });
}

// get the data from the API
const getWeatherData = async (baseURL, zip, APIkey) => {
  const response = await fetch(baseURL + zip + APIkey);

  try {
    const data = await response.json();
    // testing out the returnde data from the API in the console
    console.log(data);

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// start the post async function

const postWeatherData = async (url = "", data = {}) => {
  // testing out the posted data
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), //store the data from the API into the server
  });
  // chaine another promis to the main function without reloading the page
  try {
    const otherData = await response.json();
    return otherData;
  } catch (error) {
    // handling the error in the console
    alert("error has found", error);
  }
};

// update the UI elements with the weather information with with async function

const updateUIweather = async () => {
  // getting the stored data from the server with a GET route
  const req = await fetch("/getData");

  try {
    const all = await req.json();
    // update the html elements with the propriate data from the server
    document.getElementById("city").innerHTML = all.city;
    document.getElementById("date").innerHTML =
      "your location date is :  " + all.locationDate;
    document.getElementById("temp").innerHTML =
      "it's " + all.tempreture + "&degC";

    document.getElementById("content").innerHTML =
      "want to say: " + all.feeling;
  } catch (error) {
    console.log("error", error);
  }
};
