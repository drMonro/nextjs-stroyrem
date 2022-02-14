const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const {convertXML} = require("simple-xml-to-json");
const fs = require("fs");
const parser = require('xml2json');

const app = express();
const PORT = process.env.PORT || 6005;

app.use(express.json({extended: true}));
// app.use('/api/goods/', require('./routes/offers.routes'));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://drmonro:Highpower13@cluster0.48csq.mongodb.net/stroyrem-mongodb?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

        app.listen(PORT, () => {
            console.log('server listen on pore: ' + PORT)
        })
        const db = mongoose.connection.db;

        console.log(db);

    } catch (error) {
        console.log(error);
    }

    let test;

    axios({
        url: 'https://xn--24-mlcpqjncfk.xn--p1ai/offers-test.xml',
        method: 'GET',
        responseType: 'blob', // <--
    }).then(response => {
        // console.log(response)
        // const dbJSON = convertXML(response.data);
        // // console.log(dbJSON.yml_catalog);
        // // console.log(dbJSON);
        // console.log(dbJSON.yml_catalog.children[0].shop.children[3].currencies.children[0].currency.children[15])
        // console.log(response.data);

        const json = parser.toJson(response.data, {
            object: true,
            trim: true,
        });
        const offers = json.yml_catalog.shop.offers;
        // console.log("to json -> %s", json.yml_catalog.shop.offers);
        // console.log("to json -> %s", JSON.stringify(json, null, 4));
        // console.log(JSON.stringify(convertXML(response.data), null, 4))

        // console.log("to json -> %s", json);
        // const db = JSON.parse(dbJSON);
        // for (let key in dbJSON) {
        //     if (dbJSON.hasOwnProperty(key)) {
        //         //ключ = key
        //         //значение = person[key]
        //         console.log("Ключ = " + key);
        //         console.log("Значение = " + dbJSON[key]);
        //     } // если объект person имеет key (если у person есть свойство key)
        // }
        // for (let i=0; i<=dbJSON.children.length-1; i++) {
        //     // if (person.children[i].hasOwnProperty(key)) {
        //     //i = индекс
        //     //значение = person.children[i]
        //     console.log("Элемент [ "+ i +" ] = " + dbJSON.children[i]);
        // }
            // }
        // const offers = dbJson.
        // console.log(myJson);
        // console.log(JSON.stringify(convertXML(response.data), null, 4))

        // const file_url = URL.createObjectURL(blob_file);
        // window.open(file_url); // open file in new tab
    });

}

start();
