require('dotenv').config();
const axios = require('axios')
const moment = require('moment')
const getData = async function(){
    const host = process.env.FETCH_HOST
    let response = await axios.get(host);
    if(response) {
        console.log(response)
        response.data.data.medias.forEach(one => {
            console.log(`title: ${one.title} and one fav_time : ${moment(one.fav_time * 1000).format('YYYY-MM-DD HH:mm')} /n`)
        });
    } else {
        console.error('some err')
    }
};
getData();