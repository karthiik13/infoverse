import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port=3000;
const API_URL_1="https://calendarific.com/api/v2";
const API_KEY_1="yKoFqAWDiea4iw2beOh39Xlpwzbe72N8";
const API_URL_2="https://api.openweathermap.org/data/2.5/weather?lat=10.022&lon=76.3087&units=metric";
const API_KEY_2="11629bb44acfa1a06e2146d28782fcc8"
const country="in";
var dt= new Date();
var year= dt.getFullYear();
var month=dt.getMonth()+1;


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));




app.get("/",async (req,res)=>{
try {
	const response1 = await axios.get(API_URL_1+"/holidays",{
        params : {
            api_key: API_KEY_1,
            country: country,
            year: year,
            month: month
        }
    });
    const response2 = await axios.get(API_URL_2,{
        params: {
            appid: API_KEY_2
        }
    });
    const data= response2.data;
    const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
	console.log(response2.data);



    res.render("index.ejs",{
        content: response1.data,
        city: "Ernakulam",
        iconURL,
        description: data.weather[0].main,
        temperature: `${data.main.temp}°C`,
        feelslike: data.main.feels_like,
        humidity: `Humidity: ${data.main.humidity}%`,
        wind: `Wind: ${data.wind.speed} m/s`,
    });

} catch (error) {
	console.error(error);
}
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
