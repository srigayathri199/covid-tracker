import React from 'react'
import './Section2.css'

function Section2() {
    return (
        <div className="section2">
            <div className="mid">
            <h1 className="sec2-head">Symptoms of COVID-19</h1>
            <div className="symptoms">
               
                <div className="li">
                    <h2 className="sym">Headache</h2>
                    <h2 className="sym">Cough</h2>
                    <h2 className="sym">Fever</h2>
                </div>
                
                <div className="back_circle">

                <img src="https://www.auntminnie.com/user/images/content_images/pho_redir/2020_04_15_20_00_7340_coronavirus_cells_lungs_400.jpg" alt="symptoms" className="sec2_lungs" />
                </div>

                
                <div className="li">
                    <h2 className="sym">Dyspnoea</h2>
                    <h2 className="sym">Muscle pain</h2>
                    <h2 className="sym">Chest pain</h2>
                    
                </div>
            </div>
            </div>
        </div>
    )
}

export default Section2
// https://www.auntminnie.com/user/images/content_images/pho_redir/2020_04_15_20_00_7340_coronavirus_cells_lungs_400.jpg