import React,{useState,useEffect} from 'react';
import './Section1.css';
import CaseBox from './CaseBox';
import{prettyPrintStat} from './util'


function Home() {
    const [countryInfo,setCountryInfo] = useState({});

    useEffect(()=>{
      fetch('https://disease.sh/v3/covid-19/all').then(res=>res.json())
      .then(data=>setCountryInfo(data))
    },[]);

        return (
        <section className="home">
        <div className="home_container">
            <div className="home_cn2">
                <div className="home_top">
                    <h2 className="home_h2">COVID-<span className="home_19">19</span></h2>
                </div>

                <div className="home_middle">
                    <div className="middle_left">
                        <h3 className="p1">188+ Countries are Affected By</h3>
                        <h1 className="p2">CORONA</h1>
                        <p className="p3">
                            The Virus was first reported in Wuhan,Hubei China on 17 November 2019, and on 11 March 2020,the World Health Organisation(WHO) declared the outbreak as a Pandemic. <br></br>
                                Since 2021, variants of the virus have emerged or become dominant in many countries, with the Delta, Alpha and Beta variants being the most virulent.<br></br> As of 5 August 2021, more than 200 million cases have been confirmed, with more than 4.26 million confirmed deaths attributed to COVID-19, making it one of the deadliest pandemics in history.
                        </p>
                            
                          
                        <a href="https://en.wikipedia.org/wiki/COVID-19" className="link">
                            ABOUT COVID-19 
                        </a>
                    </div>

                    <div className="middle_right">
                        <div className="around_img">

                        <img alt="covid" width={300} height={220} className="covid_image" src="https://www.news-medical.net/image.axd?picture=2020%2F11%2Fshutterstock_1634310124.jpg"/>
                        <div className="paly_video">

                        <a href="https://www.youtube.com/watch?v=DCdxsnRF1Fk" className="video">	
                            &#9654;
                        </a><p>See how to safe you</p>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="home_boxes">

                <CaseBox border="#658cee" bg="#0941d4" title="New Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />

                <CaseBox border="#5edd7e" bg = "#1cb142" title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />

                <CaseBox title="Deaths" border="#f36e88" bg = "#f42850" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />

                </div>

            </div>
        </div>
        </section>
    )
}

export default Home

