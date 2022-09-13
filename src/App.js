import React, { useState, useEffect } from 'react';
import {
  MenuItem, FormControl, Select, Card, CardContent
} from "@material-ui/core";
import InfoBox from './InfoBox';
import './App.css';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] =
    useState({ lat: 34.08746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, [])

  // STATE = How to write a variable in REACT <<<<<< 

  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT = Runs a piece of code based on given condition

  useEffect(() => {
    // the code inside here will run once 
    // when the component loads and not again after (only once)
    // async -> send a request, wait for it, do something with info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, //United States, United Kingdom
              value: country.countryInfo.iso2 // UK, USA, FRA
            }));

          const sortedData = sortData(data);
          setMapCountries(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    // console.log('YOOOOOO >>>>',countryCode); for testing purpose



    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        //All the data from the country
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

      });

    //https://disease.sh/v3/covid-19/all - worldwide
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE] 

  };

  console.log('COUNTRY INFO >>>', countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/* Loop through all the countries and show a dropdown list of the options */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))

              }

              {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option two</MenuItem>
            <MenuItem value="worldwide">Option three</MenuItem>
            <MenuItem value="worldwide">Yooooo</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isRed 
            active={casesType === "cases"}
            onClick={(e) => setCasesType('cases')}
            title="Coronavirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          {/* infobox coming directly from the material-ui */}
          <InfoBox
            
            active={casesType === "recovered"}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>
        {/* Infoboxs title="Corona cases"*/}
        {/* Infoboxs title="Corona recoveries"*/}
        {/* Infoboxs */}


        {/* Header * - done /} 
      {/* Title + select input dropdown field -done */}





        {/* Map */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom} />

      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
