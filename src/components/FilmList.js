import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'


const Film = ({id, title, backdrop_path}) => (
    <div id={id} className="relative w-full h-48 rounded-md shadow-3xl">
        {
            backdrop_path ? 
            <LazyLoad style={{height: '100%', width: '100%'}} once={true} placeholder={<img className="bg-blue-700 object-cover w-full h-full rounded-md opacity-50" src={`https://image.tmdb.org/t/p/w45${backdrop_path}`}/>}>
                <img className="object-cover w-full h-full rounded-md bg-blue-700" src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}/>
            </LazyLoad>
            : <div className="rounded-md w-full h-full bg-blue-100"></div> 
        }
        <Link to={`/film/${id}`} className={`z-10 p-4 w-full h-full text-center select-none cursor-pointer rounded-md absolute inset-0 flex justify-center items-center ${backdrop_path ? 'text-transparent' : ''} bg-blue-800 bg-opacity-25 transition-all duration-500 ease-in-out hover:bg-opacity-75 hover:text-gray-100`}>
            <span className="text-lg font-medium">{title}</span>
        </Link>
    </div>
)

const PanelLoading = () => (
    <div className="relative w-full h-48 rounded-md shadow-3xl bg-blue-700 animate-pulse">
    </div>
)
export default function FilmList({films}) {

    return(
        <>
            {
                films &&
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {films.map(film => (
                        <LazyLoad once={true} offset={200} debounce={2000} key={film.id} resize={true} placeholder={<PanelLoading/>}>
                            <Film 
                                key={film.id}
                                id={film.id}
                                title={film.title}
                                backdrop_path={film.backdrop_path}
                            />
                        </LazyLoad>
                    ))}
                </div>
            }
        </>
    );
}