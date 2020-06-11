import React , {useState , useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line , Doughnut} from 'react-chartjs-2';
import styles from './Chart.module.css';
const GlobalChart = ({data , country}) => {
    const {confirmed , recovered , deaths} = data;
    const [dailyData , setDailyData] = useState([]);
    //      Member      setter Method 
    useEffect(()=>{
        // Effect Callback function here
        // since useEffect hook can't make callback to async function
        const fetchAPI = async() => {
            setDailyData(await fetchDailyData());
        }
       // console.log(dailyData);
        fetchAPI();
    },[]); // To behave like componentdidMount Add empty array
          // Call Single Time Only
    const DoughnutChart = (
        confirmed ? (
            <Doughnut data={{
                labels:['Active' , 'Recovered' , 'Deaths'],
                datasets:[{
                    label:'People',
                    backgroundColor: ['rgba(0,0,255,0.5)' , 'rgba(0,255,0,0.5)' , 'rgba(255,0,0,0.5)'],
                    hoverBackgroundColor:['rgba(0,0,255)' , 'rgba(0,255,0)' ,'rgba(255,0,0)'],
                    hoverBorderWidth:[15,15,15],
                    data: [confirmed.value-recovered.value-deaths.value, recovered.value , deaths.value], //  Due to API developer Related 
                }],                                                           //  Parsed Object
            }}
            options={{
                legend: {display: true},
                title: {display:true , text:`Current State in ${country}`},
            }}
            />
        ) : null
    );
    const lineChart = (
        dailyData.length ? (
        <Line
        data = {{
            labels: dailyData.map(({date}) => date),
            /* API PROVIDES THE CONFIRMED AND DEATH CASES DATA ONLY*/
            datasets: [
                {
                    data: dailyData.map(({confirmed})=> confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                },
                {
                    data: dailyData.map(({deaths})=> deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }
            ],
        }}
        />) : null
    );
    
    return (
        <div className={styles.container}>
            {country ? DoughnutChart : lineChart}
        </div>
    )
}

export default GlobalChart;