import React from 'react'
import LazyLoad from 'react-lazyload'


const FilmInfo = ({film}) => {

    const {
        title = 'Untitled',
        release_year,
        rating,
        release_date,
        country,
        genres,
        runtime,
        tagline,
        overview,
        directors,
        crew
    } = film;

    return(
        <div className="z-10 text-blue-100 w-full md:w-7/12 lg:w-9/12">
            <div className="flex flex-col gap-6 py-6 md:py-0">
                <div>
                    <h2 id="title" className="mobile-film-title md:film-title mb-7 md:mb-2">
                        {title}
                        <span className="font-normal text-xl opacity-80 lg:text-3xl">
                            {release_year ? ` (${release_year})` : ''}
                        </span>
                    </h2>

                    <div id="film-stats" className="hidden md:film-stats">
                        <span>
                            <span className="opacity-80 border px-1 text-sm md:text-base md:py-0.5">{rating || 'NR'}</span>
                            {' '}{release_date} {country ? `(${country})` : ''}
                        </span>
                        <span>{genres.length !== 0 ? (' • ' + genres.join(', ')) : ''}</span>
                        <span>{runtime ? ` • ${runtime}` : ''}</span>
                    </div>

                    <div id="mobile-film-stats" className="mobile-film-stats md:hidden">
                        <div>
                            <span className="opacity-80 border text-sm px-1">{rating || 'NR'}</span>
                            <span> {release_date} {country ? `(${country})` : ''}</span>
                            <span>{runtime ? ` • ${runtime}` : ''}</span>
                        </div>
                        <div className="mt-1">{genres.length !== 0 ? genres.join(', ') : ''}</div>
                    </div>
                </div>

                {
                    tagline && 
                    <div id="tagline" className="text-blue-100 italic text-opacity-80 text-center md:text-left">
                        {tagline}
                    </div>
                }

                <div id="overview" className="px-4 text-center md:text-left md:p-0">
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold">Overview:</h3>
                    <p className="mt-1 text-sm lg:text-base">
                        {overview || 'Not Availble'}
                    </p>
                </div>

                <div id="crew" className={`grid  ${Object.keys(crew).length > 1 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} text-center md:text-left gap-y-4`}>
                    {
                        directors.map((director, i) => {
                            const crew_member = crew[director];
                            return(
                                <div key={director}>
                                    <div className="font-bold text-base">{director}</div>
                                    <div className="text-sm">{crew_member.map(obj => obj.job).join(", ")}</div>
                                </div>
                            )
                        })
                    }

                    {
                        Object.keys(crew).map(key => {
                            if(!crew[key].find(obj => obj.job === 'Director')) {
                                const crewMember = crew[key];
                                return(
                                    <div key={crewMember[0].id}>
                                        <div className="font-bold text-base">{key}</div>
                                        <div className="text-sm">{crewMember.map(obj => obj.job).join(", ")}</div>
                                    </div>
                                )
                            }
                        })
                    }

                </div>
            </div>
        </div>
    );
}

export default function FilmPanel({film}) {
    const { 
        backdrop_path, 
        poster_path,
    } = film;

    const bgStyle = {
        backgroundImage: backdrop_path ? `url(https://image.tmdb.org/t/p/w500${backdrop_path})` : '',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top'
    };

    return(
        <>
            <div id="container" className="relative bg-blue-800 md:p-10 flex flex-col items-center md:gap-8 md:flex-row md:rounded-md">
                <div style={{...bgStyle}} className="hidden md:block rounded-md absolute top-0 left-0 w-full h-full opacity-20 bg-blue-100"></div>
                <div id="poster-container" className="relative p-4 md:p-0 w-full md:w-5/12 lg:w-3/12">
                    <div style={{...bgStyle}} className="md:hidden absolute top-0 left-0 w-full h-full bg-blue-100"></div>
                    <div id="poster" className="relative w-24 h-32 md:w-full md:h-96">
                        <LazyLoad once={true} style={{height: '100%'}}  throttle={500}>
                            {poster_path ? 
                                <img className="bg-blue-100 object-fit border-2 w-full h-full   border-blue-400 rounded-md" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}/>
                            :
                                <div className="bg-blue-100 border-2 w-full h-full border-blue-400 rounded-md flex justify-center items-center text-xl font-semibold">Not Available</div>
                            }
                        </LazyLoad>
                    </div>
                </div>
                <FilmInfo film={film}/>
            </div>
        </>
    )
}