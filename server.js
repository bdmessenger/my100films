require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')

const port = process.env.PORT || 8080

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s;}
    return s;
}

Number.prototype.timeConvert = function() {
    var time = this;

    if(time === 0) return 'Invalid time'
    let arr = [];
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    
    if(hours !== 0) arr.push(hours + 'h');
    if(minutes !== 0) arr.push(minutes + 'm')
    
    return arr.join(' ');
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.DOMAIN || 'localhost:8080'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    next();
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/api/home', (req,res) => {
    axios.get(`https://api.themoviedb.org/3/list/${process.env.LIST_ID}?api_key=${process.env.API_KEY}&language=en-US`)
    .then(result => {
        if(result.data.items) {
            const films = result.data.items.map((film) => {
                return {id: film.id, title: film.title, backdrop_path: film.backdrop_path};
            })
            res.send({
                films,
                creator: result.data.created_by
            })
        }
    })
})

app.get('/api/list/:id', (req,res) => {
    const id = req.params.id;
    axios.get(`https://api.themoviedb.org/3/list/${id}?api_key=${process.env.API_KEY}&language=en-US`)
      .then(result =>  {
          if(result.data.items) {
                const films = result.data.items.map((film) => {
                    return {id: film.id, title: film.title, backdrop_path: film.backdrop_path};
                })
                return res.send({
                    films, 
                    creator: result.data.created_by
                });
          }
      });
})

app.get('/api/film/:id', (req,res) => {
    const id = req.params.id;
    const filmDetailsRequest = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`);
    const filmReleaseRequest = axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.API_KEY}`);
    const filmCreditsRequest = axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`);
    const filmRecommendationsRequest = axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`);

    axios.all([filmDetailsRequest, filmReleaseRequest, filmCreditsRequest, filmRecommendationsRequest])
    .then(axios.spread((...responses) => {
        const filmDetails = responses[0].data;
        const filmRelease = responses[1].data;
        const filmCredits = responses[2].data;
        const filmRecommendations = responses[3].data;

        const release = filmRelease.results.find(obj => obj.iso_3166_1 === 'US') || filmRelease.results[0];

        const crew = {};

        filmCredits.crew.filter(obj => obj.job === 'Director').forEach(obj => {
            if(!crew.hasOwnProperty(obj.name)) crew[obj.name] = [];
            const {id, job, name} = obj;
            crew[obj.name].push({id, job, name});
        });

        filmCredits.crew.filter(obj => obj.job === 'Screenplay' || obj.job === 'Story' || obj.job === 'Writer' || obj.job === 'Characters' || obj.job === 'Novel').forEach(obj => {
            if(!crew.hasOwnProperty(obj.name)) crew[obj.name] = [];
            const {id, job, name} = obj;
            crew[obj.name].push({id, job, name});
        });

        const directors = Object.keys(crew).filter(name => crew[name].find(obj => obj.job === 'Director'));

        const date = filmDetails.release_date && new Date(release.release_dates[0].release_date);

        const release_date = date && {
            date: `${(date.getUTCMonth() + 1).pad()}/${date.getUTCDate().pad()}/${date.getUTCFullYear()}`,
            year: date.getFullYear(),
            month: (date.getMonth() + 1).pad(),
            day: date.getDate().pad()
        };

        const filmRating = release.release_dates.find(obj => obj.certification !== "");

        const film = {
            backdrop_path: filmDetails.backdrop_path,
            title: filmDetails.title,
            poster_path: filmDetails.poster_path,
            release_date: release_date.date,
            release_year: release_date.year,
            tagline: filmDetails.tagline,
            overview: filmDetails.overview,
            country: release.iso_3166_1,
            rating: filmRating ? filmRating.certification : 'NR',
            genres: filmDetails.genres.map(obj => obj.name),
            runtime: filmDetails.runtime.timeConvert(),
            directors,
            crew,
            cast: filmCredits.cast.splice(0,8).map(({id, name, character, profile_path}) => ({id, name, character, profile_path})),
            recommendations: filmRecommendations.results.splice(0,8).map(({id, title, backdrop_path}) => ({id, title, backdrop_path})),
            status: filmDetails.status
        };

        res.send(film);
    }))
    .catch(error => {
        console.log(error);
        res.status(400).send('error');
    })
});

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname + '/dist', 'index.html'))
})

app.listen(port, () => console.log(`Server's listening to port: ${port}`))