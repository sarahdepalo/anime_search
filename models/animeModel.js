'use strict';

const fetch = require('node-fetch');

const getAnime = async (req, res) => {
    const { anime } = req.body;
    // console.log(req.body);
    if(!anime) {
        res.render('template', {
            locals: {
                title: 'Search for an anime!'
            },
            partials: {
                body: 'partials/home'
            }
        })
    } else {
        const url = `https://api.jikan.moe/v3/search/anime?q=${anime}`;

        try {
            // wait for the fetch of the url, turn into a json object 
            const data = await fetch(url).then(response => response.json());
           // giving back data now, but still need it to populate the anime page. 
            const results = data.results; 
            console.log(Array.isArray(results));  
            results.length = 5;
            console.log(results);
            res.render('template', {
                locals:  {
                    data: results,
                    title: 'Search for an anime!'
                },
                partials: {
                    body: 'partials/anime'
                }
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    
}

module.exports = { getAnime };