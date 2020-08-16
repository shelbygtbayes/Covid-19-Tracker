//import { responsiveFontSizes } from "@material-ui/core";
//const request = require("request-promise");
//const cheerio = require("cheerio");
const axios = require('axios');
const url = 'https://api.covidindiatracker.com/state_data.json';
const dataTable = [];
export const fetchData = async () => {
    try{
        //const result = await request.get("https://www.mohfw.gov.in/");
        await axios.get(url).then((response) => {
            for(let i = 0 ; i < response.data.length ; i++)
            {
                const srno = i+1;
                const states_ut = response.data[i]["state"];
                const discharged_cases = response.data[i]["recovered"];
                const deaths = response.data[i]["deaths"];
                const confirmed_cases = response.data[i]["confirmed"];
                const active = confirmed_cases - discharged_cases - deaths;
                const row = [srno , states_ut , active , discharged_cases , deaths , confirmed_cases];    
                dataTable.push(row);    
            }
        });
        //const $ = cheerio.load(result);
        /*$("body > div#myModal.content > div.main-body-content > div#main-content > section#state-data.site-update > div.container > div.row > div.col-xs-12 > div.data-table.table-responsive > table.table.table-striped > tbody > tr ").each((index , element) => {
        if(index < 35){
            console.log(element);
            const srno = parseInt($($(element).find("td")[0]).text());
            const states_ut = $($(element).find("td")[1]).text();
            const active = parseInt($($(element).find("td")[2]).text());
            const discharged_cases = parseInt($($(element).find("td")[4]).text());
            const deaths = parseInt ($($(element).find("td")[6]).text());
            const confirmed_cases = active + discharged_cases + deaths;//parseInt($($(element).find("td")[5]).text());
            const row = [srno , states_ut , active , discharged_cases , deaths , confirmed_cases];
            //console.log(row);
            dataTable.push(row);
        }
        //else if($($(element).find("td")[1]).text() === "Total#")//index === 35)
        //{
        /*    const states_ut = "India";
            const srno = 0;
            const active = parseInt($($(element).find("td")[2]).text());
            const discharged_cases = parseInt($($(element).find("td")[3]).text());
            const deaths = parseInt($($(element).find("td")[4]).text());
            const confirmed_cases = parseInt($($(element).find("td")[5]).text());
            const row = [srno , states_ut , active , discharged_cases , deaths , confirmed_cases];
            dataTable.push(row);
        }
    }); */
    console.log("Done");
    return dataTable;
    } catch(error)
    {
        console.log("Falied to recieve the data");
        console.log(error);
    }
}
export const fetchLocationData = async(location) => {
    try
    {
        const data = await fetchData();
        var location_index = 0;
        for(let ind = 0 ; ind < data.length ; ind++)
        {
            if(data[ind][1] === location)
            {
                location_index = ind;
                break;
            }
        }
        //console.log("Data sent : " + data[location_index] + " " + location_index);
        return data[location_index];
    }catch(error)
    {
        console.log(error);
    }
}
export const fetchLocations = async() => {
    try {
        const data = await fetchData();
        return data.map((row) => [row[1]]);
    } catch(error) {
        console.log(error);
    }
}