import React from 'react';
import {Cards , Chart , LocationPicker} from './India/components';
import {Online , Offline} from 'react-detect-offline';
import {Globalcards , GlobalChart , CountryPicker} from './Global/components';
import styles from './App.module.css';
import {fetchLocationData} from './India/api';
import {fetchData} from './Global/api';
class App extends React.Component{
    state = {
        dataI : {},
        dataG : {},
        location : '',
        country : '',
        show : true,
    }
    toggleDiv = () => {
        const {show} = this.state;
        this.setState( { show : !show});
    }
    async componentDidMount() {
        const fetchedData = await fetchLocationData('');
        this.setState({dataI : fetchedData});
        const fetchedata = await fetchData();
        this.setState({dataG : fetchedata});
        this.toggleDiv = this.toggleDiv.bind(this);
    }
    handleLocationChange = async (location) => {
        //console.log("I am in " + location);
        const fetchedlocationData = await fetchLocationData(location);
        this.setState({dataI : fetchedlocationData , location : location});
        // reset for global
        const fetchedCountryData = await fetchData('');
        this.setState({dataG : fetchedCountryData , country : ''});
    }
    handleCountrychange = async (country) => {
        // fetch data and set state
        //console.log(" Who am I");
        const fetchedCountryData = await fetchData(country);
        this.setState({dataG : fetchedCountryData , country : country});
        const fetchedData = await fetchLocationData('');
        this.setState({dataI : fetchedData});
    }
    toggleTitle = () => {
        if(this.state.show)
            return "Global";
        else
            return "India";
    };
    render() {
        // eslint-disable-next-line
        const {dataI , dataG, location , country} = this.state;
        return (
            <div>
                <Offline>
                    <h2 className={styles.Offline}>Internet Connection Lost</h2>
                </Offline>
                <Online>
                <div className={styles.container}>
                        <button onClick={this.toggleDiv} className={styles.button}>{this.toggleTitle()}</button>
                        {this.state.show && <Globalcards data={dataG}/>} 
                        {this.state.show && <CountryPicker handleCountrychange={this.handleCountrychange}/>}
                        {this.state.show && <GlobalChart data={dataG} country={country}/>}
                        {!this.state.show && <Cards dataI={dataI}/>}
                        {!this.state.show && <LocationPicker handleLocationChange={this.handleLocationChange}/>}
                        {!this.state.show && <Chart dataI={dataI}/>}
                </div>
                </Online>
            </div>
        )
    }
}export default App;
