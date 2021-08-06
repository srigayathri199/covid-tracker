import React, { useEffect,useState } from 'react'
import './Section4.css';
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'



const options = {
    plugins: {
        legend: {
            display:false,
            
        }
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
        
      yAxes: [
        {
         
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
            
          },
        },
      ],
    },
  };
  
  

const buildChartData = (data,casesType) =>{
    const chartData = [];
    let lastDataPOint;
    for(let date in data.cases){
        if(lastDataPOint){
            const newDataPoint = {
                x:date,
                y:data[casesType][date]-lastDataPOint
            }
            chartData.push(newDataPoint)
        }
        lastDataPOint = data[casesType][date]
    }
    return chartData;
}

function Section4({countriesData,casesType}) {
const [data,setData] = useState({})

// "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
const graphColor = (type)=>{
    var borderColor='';
    if(type==='cases') borderColor='rgba(1, 28, 69,0.5)'
    if(type === 'recovered') borderColor= 'rgba(28, 177, 66,0.5)'
    if(type === 'deaths') borderColor = 'rgba(243, 110, 136,0.5)'
    return borderColor
   }

    useEffect(()=>{
        const fetchData = async ()=>{

           await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                const chartD = buildChartData(data,casesType);
                setData(chartD)
            })
        }
        fetchData()
    },[casesType])

    

    return (
        <div className="table_graph">

          <div className="table_div">
          <h2 className="table_hd">Live Cases By Country</h2>
          
            <div className="table">
                
                {countriesData.map(({country,cases},i)=>(
                    <tr>
                        <td>{country}</td>
                        <td>{numeral(cases).format("0,0")}</td>
                    </tr>
                ))}

            </div>
          </div>
          
          <div className="graph_div">
            <h2 className="graph_hd">WorldWide New {casesType}</h2>
            {data?.length>0 && (
                
                <div className="graph">
                    <Line 
                        data={{
                            datasets:[{
                                backgroundColor: "rgba( 255, 255, 255, 0.1)",
                                borderColor:graphColor(casesType),
                                data: data,
                                fill:false,
                                color:'#fff',
                                label: 'Circles',
                                
                                
                                pointStyle: 'circle',
                                pointRadius: 2,
        
                            }
    
                            ]
                        }}
                        options={options}
                       
                    />
                </div>
                )}
          </div>
          

        </div>
    )
}

export default Section4
