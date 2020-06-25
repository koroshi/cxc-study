require('dotenv').config();
const moment = require('moment');
const fs =require('fs');
const path = require('path');
const axios = require('axios')
const getData = async function(){
    const host = process.env.FETCH_HOST;
    let fileName =''
    let response = await axios.get(host);
    if(response) {
        response.data.data.medias.forEach(one => {
            if (!fileName)  {
                fileName = `${moment(one.fav_time * 1000).format('YYYY-MM-DD_HH_mm')}.txt`;
                fs.writeFileSync(fileName, `${moment().format('YYYY-MM-DD HH:mm:ss')} \r\n\r\n\r\n`);
            }

            const appendData = `${one.title} \r\n收藏时间:${moment(one.fav_time * 1000).format('YYYY-MM-DD HH:mm')}  \r\n视频地址:${one.link} 
 \r\n\r\n`;
            fs.appendFileSync(fileName, appendData, 'utf8');
            console.log(appendData)
        });
    } else {
        console.error('some err')
    }
    if (process.env.SAVE_PATH) {
        const readStream = fs.createReadStream(fileName)
        const filePath = path.join(process.env.SAVE_PATH, fileName)
        var writeStream = fs.createWriteStream(filePath);
        readStream.pipe(writeStream);
        readStream.on('end', function () {
            fs.unlinkSync(fileName);
        });

    }
};
getData().catch(console.log);