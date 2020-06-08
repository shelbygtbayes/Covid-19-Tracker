import React  from 'react';
import {Doughnut} from 'react-chartjs-2';
import styles from './Chart.module.css';
import {CircularProgress} from '@material-ui/core';
const Chart = ({dataI}) => {
    if(!dataI || !dataI.length)
    {
        return (
            <CircularProgress/>
        );
    }
    // eslint-disable-next-line
    var [srno , states_ut , active , discharged_cases , deaths , confirmed_cases] = dataI;
    if(dataI[1] === 'India')
    {
        states_ut = dataI[1];
        confirmed_cases = dataI[2];
    }
    const DoughnutChart = (
        confirmed_cases ? (
            <Doughnut data={{
                labels:['Active' , 'Recovered' , 'Deaths'],
                datasets:[{
                    label:'People',
                    backgroundColor: ['rgba(0,0,255,0.5)' , 'rgba(0,255,0,0.5)' , 'rgba(255,0,0,0.5)'],
                    hoverBackgroundColor:['rgba(0,0,255)' , 'rgba(0,255,0)' ,'rgba(255,0,0)'],
                    hoverBorderWidth:[15,15,15],
                    data: [active, discharged_cases , deaths], //  Due to API developer Related 
                }],                                                           //  Parsed Object
            }}
            options={{
                legend: {display: true},
                title: {display:true , text:`Current Location : ${states_ut}`},
            }}
            />
        ) : null
    );    
    return (
        <div className={styles.container}>
            {DoughnutChart}
        </div>
    )
}
export default Chart;
