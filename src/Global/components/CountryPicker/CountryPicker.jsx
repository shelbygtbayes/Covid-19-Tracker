import React , {useState , useEffect} from 'react';
import {NativeSelect , FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css'
import {fetchCountries} from '../../api';
const CountryPicker = ({handleCountrychange}) => {
    const [fetchedCountries , setFetchedCountries]  = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }
        fetchAPI();
        
    },[setFetchedCountries]); // Here Empty array does'nt change hence run infinite times , Put the function so that run when called
    //console.log(fetchedCountries);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="----" onChange={(e) => handleCountrychange(e.target.value)} >
                <option value="----"> ---- </option>
                <option value=""> Global </option>
                {fetchedCountries.map((country,index) => <option key={index} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
export default CountryPicker;