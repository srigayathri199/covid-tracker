import React from "react";
import {Circle,Popup} from 'react-leaflet'
import numeral from "numeral";



const casesTypeColors = {
    cases: {
      hex: "#658cee",
      
      multiplier: 800,
    },
    recovered: {
      hex: "#1cb142",
    
      multiplier: 1200,
    },
    deaths: {
      hex: "#f36e88",
      
      multiplier: 2000,
    },
};



export const sortData  = (data)=>{
    const sortedData =[...data];
    return sortedData.sort((a,b)=>(
        a.cases>b.cases?-1:1
    ))
}

export const prettyPrintStat = (stat) =>stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//circles on map
// console.log(casesType)
export const showDataOnMap = (data,casesType)=>(
    data.map(country=>(
        <Circle center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={{color: casesTypeColors[casesType].hex,
            fillColor: casesTypeColors[casesType].hex }}
        radius={
            Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier
        }
        >
            <Popup>
                <div className="info_container">
                    <div 
                    className="info_flag"
                    style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>

                    <div className="info_name">{country.country}</div>

                    <div className="info_confirmed">Cases : {numeral(country.cases).format("0,0")}</div>

                    <div className="info_recovered">Recovered : {numeral(country.recovered).format("0,0")}</div>

                    <div className="info_deaths">Deaths : {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>

        </Circle>
    ))
)