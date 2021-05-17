import fetch from 'node-fetch';
import models from '../models/index.models';

const getData = async (endpoint: any) => {
    const results = [];
    let page = 1;
    let hasNext = true;

    // Aslong as there is a next page on the SwapiDev endpoint get the new page otherwise return.
    do {
        const url = `${endpoint}?page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        data.results = data.results.map((item: any) => {
            // Create Mongoose _id from page URL.
            item._id = item.url;

            // Add age index for sorting
            if (item?.birth_year) {
                // Change to Number type 
                item.age = item.birth_year === 'unknown' ? -1 : parseInt(item?.birth_year.replace('BBY', ''), 10);
            } 

            // Change Height to Number
            if (item?.height) {
                item.height = item.birth_year === 'unknown' ? -1 : parseInt(item?.height, 10);
            }

            return item;
        })

        results.push(data.results);

        // If data has no next page exit do loop.
        if (!data?.next) hasNext = false;

        page++
    } while (hasNext);

    return results.reduce((prev, next) => {
        //  Replace all the SwapiDev URLs to get only the numbers.
        return prev.concat(JSON.parse(JSON.stringify(next).replace(/(http:\/\/swapi.dev\/api\/\w+\/)(\d+)(\/)/gim, '$2')))
    }, [])
}

const getSwapiData = async () => {
    // Get all Swapi Endpoints
    const data = await fetch('https://swapi.dev/api/')
    const endpoints = await data.json()

    // For each end point create an array with name as collection key with results.
    const results = await Promise.all(Object.entries(endpoints).map(async ([collection, endpoint]) => {
        const results = await getData(endpoint);

        return { collection, results }
    }));

    return results
}

export const populateData = async () => {
    try {
        // Get all the SwapiDev Data 
        const data = await getSwapiData();

        // Get models with string as key
        const _models: { [key: string]: any } = models;

        // Insert all the results to their own collection
        data.map(async ({ collection, results }) => {
            // Get correct model
            const model = _models[collection];

            // If SwapiDev adds new endpoint without having correct Model for it.
            if (typeof model === 'undefined') throw new Error('Trying to access unknown Model');

            const { upsertedCount, modifiedCount } = await model.bulkWrite(
                results.map((item: any) =>
                ({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: item },
                        upsert: true
                    }
                })
                )
            );

            console.info(`
                Total inserted: ${upsertedCount},
                Total Modified: ${modifiedCount}
            `);
        });
    } catch (err) {
        console.error(err);
    }
}

