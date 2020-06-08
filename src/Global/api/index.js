import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let ChangebleUrl = url;
    if(country)
    {
        ChangebleUrl = `${url}/countries/${country}`
    }
    try{
        const {data : {confirmed , recovered , deaths , lastUpdate}} = await axios.get(ChangebleUrl);
        const modifiedData = {confirmed , recovered , deaths , lastUpdate};
        /* same like
        const modifiedData = {
            confirmed: confirmed,
            recovered: recovered,
            deaths: deaths,
            lastUpdate: lastUpdate,
        }*/
        return modifiedData;
    }catch(error) {
        console.log(error);
    }
}
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((data) => ({
            confirmed: data.confirmed.total,
            deaths: data.deaths.total,
            date : data.reportDate
        }));
        return modifiedData;
    } catch (error){

    }
}
export const fetchCountries = async() => {
    try {
        const {data : {countries}} = await axios.get(`${url}/countries`);
        //console.log("I am in fetchCountries " + countries);
        return countries.map((country)=>country.name);
    } catch(error) {
        console.log(error);
    }
}