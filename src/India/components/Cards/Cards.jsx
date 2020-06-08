import React from 'react';
import styles from './Cards.module.css';
import {Card , CardContent , Typography , Grid , CircularProgress} from '@material-ui/core';
import { CircularProgressbar ,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import cx from 'classnames'
import CountUp from 'react-countup';
const Cards = ({dataI}) => {
    if(!dataI || !dataI.length)
    {
        return (
            <CircularProgress color="secondary" />
        );
    }
    // eslint-disable-next-line
    var [srno , states_ut , active , discharged_cases , deaths , confirmed_cases] = dataI;
    if(dataI[1] === 'India')//
    {
        states_ut = dataI[1];
        active = dataI[2];
        discharged_cases = dataI[3];
        deaths = dataI[4];
        confirmed_cases = dataI[5];
    }
    const recovery_rate = (discharged_cases / confirmed_cases)*100;
    const mortality_rate = (deaths / confirmed_cases)*100;
    return (
        <div>
        <Grid container>
            <Grid item component={Card} className={cx(styles.card , styles.confirmed)}>
                <CardContent>
                        <Grid item  align="center">
                            <Typography color="textSecondary" variant="h5" styles="font-family: 'Poppins', sans-serif;">Confirmed</Typography>
                            <Typography variant="h5">
                            <CountUp start={0} end={confirmed_cases} duration={2.0} separator=","/>
                            </Typography>

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
                        <Typography variant="body2">Number of Active Cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs = {6}  md={3} className={cx(styles.card , styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={discharged_cases} duration={2.0} separator=","/>
                        </Typography>
                        <Typography variant="body2">Number of Recovered Cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs = {6} md={3} className={cx(styles.card , styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths} duration={2.0} separator=","/>
                        </Typography>
                        <Typography variant="body2">Deaths</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Grid>
    </div>

    )
}
export default Cards;