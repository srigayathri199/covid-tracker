import React from 'react'
import './Section3.css';
import {FormControl,MenuItem,Select} from '@material-ui/core'
import { useEffect, useState } from 'react';
import CaseBox from './CaseBox';
import Section4 from './Section4';
import Map from './Map';
import {prettyPrintStat, sortData} from './util';
import "leaflet/dist/leaflet.css";


function Section3() {
    const [countries,setCountries] = useState([]);
    const [country,setCountry] = useState('Worldwide');
    const [countryInfo,setCountryInfo] = useState({});
    const [tableData,setTableData] = useState([])
   const [mapZoom,setMapZoom] = useState(2);
   const [mapCenter,setMapCenter] = useState({lat:34.80746,lng:-40.4796});
   const [mapCountries,setmapCountries] = useState([])
    const [casesType,setCasesType] = useState('cases')
    useEffect(()=>{
      fetch('https://disease.sh/v3/covid-19/all').then(res=>res.json())
      .then(data=>setCountryInfo(data))
    },[])

    useEffect(()=>{
        
        const getCountries =async()=>{
        await fetch('https://disease.sh/v3/covid-19/countries').then((res)=>res.json()).then((data)=>{
            const countries = data.map((country)=>(
            {
                name:country.country,
                value:country.countryInfo.iso3
            }
            ))
            const sortedData = sortData(data)
            setTableData(sortedData)
            setmapCountries(data)
            setCountries(countries)
        })
        } 
        getCountries()
    },[])

    const onCountryChange= async (e)=>{
        const countryCode = e.target.value;
        const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
        .then((res)=>res.json())
        .then(data=>{
            
            setCountryInfo(data);
            setCountry(countryCode);
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);

            setMapZoom(4)
        })
    }
    return (
       
      <div className="sec3_header">
        <div className="mid3">

            {/* dropdown */}
            <div className="header">

                <h1 className="sec3_heading">COVID-<span className="home_19">19</span> TRACKER</h1>
        
                
            </div>


            {/* Info boxes */}
            <div className="sec3_boxes">

                <FormControl style={{width:'auto',margin:'auto 0 auto 0'}}className="app_dropdown">
                
                <Select variant="outlined" style={{color:'white', border:'1px solid rgba( 255, 255, 255, 0.18)',outline:'none'}} value={country} onChange={onCountryChange}>

                    <MenuItem value="Worldwide">
                        Worldwide
                    </MenuItem>

                    {countries.map((country,i)=>(
                    <MenuItem key={i} value={country.value}>
                        {country.name}
                    </MenuItem>

                    ))}
                </Select>

                </FormControl>
                <div className="section3--boxex">

                
                <CaseBox 
                    onClick={(e)=>setCasesType('cases')} 
                    border="#658cee" 
                    bg="#0941d4" 
                    title="New Cases"
                    cases={prettyPrintStat(countryInfo.todayCases)} 
                    total={prettyPrintStat(countryInfo.cases)} 
                    active={casesType==='cases'}
                />

                <CaseBox 
                    onClick={(e)=>setCasesType('recovered')} border="#5edd7e" 
                    bg = "#1cb142" title="Recovered" 
                    cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} 
                    active={casesType==='recovered'}

                />

                <CaseBox 
                    onClick={(e)=>setCasesType('deaths')} 
                    title="Deaths" border="#f36e88"
                    bg = "#f42850" 
                    cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} 
                    active={casesType==='deaths'}

                />
                </div>
            </div>



            {/* Map */}

            <div className="initialMap">
                <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType = {casesType}/>
            </div>



            {/* Table and graph  in section 4*/}

            <div className="mapandGraph">
                <Section4 casesType={casesType} countriesData = {tableData} />
            </div>





        </div>
      </div> 
        
    )
}

export default Section3
