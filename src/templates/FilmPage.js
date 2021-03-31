import React, { useEffect } from 'react'
import useFetch from 'use-http'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'

import FilmPanel from '../components/FilmPanel'

export default function FilmPage({filmId}) {
    const { loading, error, data, cache } = useFetch(`/api/film/${filmId}`, {
        cacheLife: (1000 * 60 * 60),
        persist: true
    }, []);

    cache.clear();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if(error) {
        return (
            <div className="px-4 w-full flex flex-col justify-center items-center h-96 gap-4">
                <h3 className="text-blue-100 text-2xl md:text-4xl text-center font-semibold">Sorry. The film you're looking is not available.</h3>
                <Link to="/" className="text-blue-200 text-xl md:text-3xl text-center font-semibold underline">Click here to return to main page.</Link>
            </div>
        );
    }
    if(loading) return (
        <div className="w-full flex justify-center mt-10 overflow-hidden">
            <svg className="animate-spin h-32 w-32 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );

    return (
        <div>
            <div className="md:mt-6 md:px-4">
                <FilmPanel film={data}/>
            </div>
            <div id="cast" className="px-4">
                <h3 className="text-blue-100 my-6 text-4xl font-semibold text-center lg:text-left">Cast</h3>
                <div className="relative">
                    <div className="overflow-x-auto grid grid-rows-1 grid-flow-col auto-cols-min gap-4 pb-3">
                    {
                        data.cast.length !== 0 ?
                            <> 
                            {
                                data.cast.map(actor => (
                                    <div key={actor.id} className="shadow-2xl relative w-40 md:w-56 rounded-md bg-blue-200">
                                        <LazyLoad once={true} height={'100%'} offset={200} throttle={300} resize={true} placeholder={
                                            actor.profile_path ?
                                                <img className="rounded-t-md object-cover w-full h-48 md:h-64" src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}/>
                                            :
                                                <img width="45px" className="rounded-t-md object-cover w-full h-48 md:h-64" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"/>
                                        }>
                                            <img 
                                                className="bg-blue-100 object-cover object-center rounded-t-md w-full h-40 md:h-64" 
                                                src={
                                                    actor.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${actor.profile_path}` :
                                                    'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                                                }
                                            />
                                        </LazyLoad>
                                        <div className="flex flex-col justify-center items-center lg:items-start p-4 text-center lg:text-left">
                                            <h3 className="text-blue-900 text-lg md:text-xl font-semibold">{actor.name}</h3>
                                            <h4 className="text-blue-900 md:text-lg">{actor.character}</h4>
                                        </div>
                                    </div>
                                ))
                            }
                                <a href={`https://www.themoviedb.org/movie/${filmId}/cast`} target="_blank" className="w-40 md:w-56 bg-blue-200 rounded-md flex justify-center items-center px-2 text-center text-lg md:text-xl font-semibold">
                                    Click to view all cast and crew at TMDB
                                </a>
                            </>
                        :
                        <div className="w-full text-blue-100 font-semibold text-xl text-center lg:text-left">No Cast Available</div>
                    }
                        
                    </div>
                </div>
            </div>
            <div id="recommendations" className="px-4 mt-10">
                <h3 className="text-blue-100 my-6 text-4xl font-semibold text-center lg:text-left">Recommendations</h3>
                <div className="relative">
                    <div className="overflow-x-auto grid grid-rows-1 grid-flow-col auto-cols-min gap-4 pb-3">
                    {
                        data.recommendations.length !== 0 ?
                            data.recommendations.map(film => (
                                <Link to={`/film/${film.id}`} key={film.id} className="shadow-2xl relative w-56 rounded-md bg-blue-200">
                                    <LazyLoad once={true} throttle={300} offset={300} resize={true} placeholder={<div className="bg-blue-100 w-full h-32 rounded-t-md"></div>}>
                                        {film.backdrop_path ?
                                            <img 
                                                className="bg-blue-100 object-cover rounded-t-md w-full h-32" 
                                                src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                                            />
                                        :
                                            <div className="bg-blue-100 object-cover rounded-t-md w-full h-32 flex justify-center items-center font-semibold border-b border-blue-800">Not Available</div>
                                        }
                                    </LazyLoad>
                                    <div className="flex flex-col justify-center items-center p-4 text-center">
                                        <h3 className="text-blue-900 text-lg md:text-xl font-semibold">{film.title}</h3>
                                    </div>
                                </Link>
                            ))
                        :
                        <div className="w-full text-blue-100 font-semibold text-center lg:text-left text-xl">No Recommendations Available</div>
                    } 
                    </div>
                </div>
            </div>
        </div>
    );
}