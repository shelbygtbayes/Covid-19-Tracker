import React , {useState , useEffect} from 'react';
import {NativeSelect , FormControl} from '@material-ui/core';
import styles from './LocationPicker.module.css'
import {fetchLocations} from '../../api';
const LocationPicker = ({handleLocationChange}) => {
    const [fetchedLocations , setfetchLocations]  = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setfetchLocations(await fetchLocations());
        }
        fetchAPI();
        
    },[setfetchLocations]); // Here Empty array does'nt change hence run infinite times , Put the function so that run when called
   
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleLocationChange(e.target.value)} >
                <option value="----"> ---- </option>
                {fetchedLocations.map((location,index) => <option key={index} value={location}>{location}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
export default LocationPicker;