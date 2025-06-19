import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API = "16cd4cb0222cd69234f5ed06903974ef";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.ejs", { weather: null, error: null });
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;

  const url = `http://api.weatherstack.com/current?access_key=${API}&query=${encodeURIComponent(city)}&units=m`;
  
  try {
    const result = await axios.get(url);
    const data = result.data;
    
    if (data.success === false || data.error) {
      res.render("index.ejs", {
        weather: null,
        error: "City not found or invalid request.",
      });
    } else {
      const weather = {
        city: data.location.name,
        temperature: data.current.temperature,
        description: data.current.weather_descriptions[0],
        humidity: data.current.humidity,
      };
      res.render("index.ejs", { weather, error: null });
    }
  } catch (error) {
    res.render("index.ejs", { weather: null, error: "city not found" });
  }
});

app.listen(port, () => {
  console.log(
    `running on port ${port} , click on http://localhost:${port} to open`
  );
});
