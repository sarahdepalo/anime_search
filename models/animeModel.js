'use strict';

const fetch = require('node-fetch');

const getAnime = async (req, res) => {
    const { anime } = req.body;
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
            const results = data.results; 
            results.length = 5;
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