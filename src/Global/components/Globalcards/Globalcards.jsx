import React from 'react';
import {Card , CardContent , Typography , Grid , CircularProgress} from '@material-ui/core';
import { CircularProgressbar ,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import cx from 'classnames'
import styles from './Cards.module.css'
// To add multiple styles from Cards.module.css we require to use cx (className constructor) and
// Passing the required containers/styles to it
// xs used for extra small for sizing for the mobile devices
// md for medium devices (desktops etc)
import CountUp from 'react-countup';
//import createTypography from '@material-ui/core/styles/createTypography';
const Globalcards = ({data : {confirmed , recovered , deaths , lastUpdate}}) => {
    //console.log(props);
    if(!confirmed)
    {
        return (
            <CircularProgress color="secondary" />
        );
    }

    const active = confirmed.value - recovered.value - deaths.value;
    const recovery_rate = (recovered.value / confirmed.value)*100;
    const mortality_rate = (deaths.value / confirmed.value)*100;
    return (
            <div>
                <Grid container>
                    <Grid item component={Card} className={cx(styles.card , styles.confirmed)}>
                        <CardContent>
                                <Grid item  align="center">
                                    <Typography color="textSecondary" variant="h5" styles="font-family: 'Poppins', sans-serif;">Confirmed</Typography>
                                    <Typography variant="h5">
                                    <CountUp start={0} end={confirmed.value} duration={2.0} separator=","/>
                                    </Typography>
                                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                                    <Typography variant="body2">Number of Confirmed Cases</Typography>
                                </Grid>
                                <Grid container justify="space-evenly">
                                    <Grid item xs = {2}  md={2} align="center">
                                        <CircularProgressbar  value={recovery_rate} text={`${recovery_rate}`.slice(0,5)+'%'}  styles={buildStyles({
                                                                strokeLinecap: 'butt',
                                                                pathTransitionDuration: 0.5,
                                                                pathColor: `rgba(0, 0, 199, ${recovery_rate / 100})`,
                                                                trailColor: '#d6d6d6',
                                                                backgroundColor: '#3e98c7',
                                
                                                            })}
                                                            />
                                        <Typography variant="body2">Recovery</Typography>
                                    </Grid>
                                    <Grid item xs = {2}  md={2}  align="center">
                                        <CircularProgressbar value={mortality_rate} text={`${mortality_rate}`.slice(0,5)+'%'}  styles={buildStyles({
                                                                    strokeLinecap: 'butt',
                                                                    pathTransitionDuration: 0.5,
                                                                    pathColor: `rgba(255, 0, 0, 0.5)`,
                                                                    trailColor: '#d6d6d6',
                                                                    backgroundColor: '#3e98c7',
                                                                   
                                                                })}
                                                                />
                                        <Typography variant="body2">Mortality</Typography>
                                    </Grid>
                                </Grid>
                        </CardContent>
                    </Grid>
                    <Grid container spacing={6}>
                        <Grid item component={Card} xs = {6}  md={3} className={cx(styles.card , styles.active)}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Active</Typography>
                                <Typography variant="h5">
                                    <CountUp start={0} end={active} duration={2.0} separator=","/>
                                </Typography>
                                <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                                <Typography variant="body2">Number of Active Cases</Typography>
                            </CardContent>
                        </Grid>
                        <Grid item component={Card} xs = {6}  md={3} className={cx(styles.card , styles.recovered)}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                                <Typography variant="h5">
                                    <CountUp start={0} end={recovered.value} duration={2.0} separator=","/>
                                </Typography>
                                <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                                <Typography variant="body2">Number of Recovered Cases</Typography>
                            </CardContent>
                        </Grid>
                        <Grid item component={Card} xs = {6} md={3} className={cx(styles.card , styles.deaths)}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                                <Typography variant="h5">
                                    <CountUp start={0} end={deaths.value} duration={2.0} separator=","/>
                                </Typography>
                                <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                                <Typography variant="body2">Deaths</Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        
    )
}
export default Globalcards;