import React from 'react'
import './CaseBox.css';
import {Card,CardContent,Typography} from '@material-ui/core';

function CaseBox({title,cases,total,active,border,bg,...props}) {
    // console.log(color,space);
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"}`} style={{
            borderBottom:`2px solid ${border}`,background:`${bg}`,color:'white'
            }}>
            <CardContent>

                <Typography className="infoBox_title" >
                    {title}
                </Typography>

                <h2 className="infoBox_cases">{cases}</h2>

                <Typography className="infoBox_title" >
                    Total
                </Typography>

                <h2 className="infoBox_total">
                    {total} 
                </h2>
            </CardContent>
        </Card>
    )
}

export default CaseBox
