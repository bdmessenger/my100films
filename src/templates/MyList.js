import React from 'react'
import useFetch from 'use-http'
import FilmList from '../components/FilmList'

export default function MyList() {
    const { loading, error, data } = useFetch('/api/home', {
        cacheLife: (1000 * 60 * 2),
        persist: true
    }, []);

    if(error) return 'Error!'
    if(loading) return (
        <div className="w-full flex justify-center mt-10 overflow-hidden">
            <svg className="animate-spin h-32 w-32 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );

    return(
        <>
            {
                data &&
                <div className="my-10 px-4">
                    <h3 className="gap-2 text-blue-100 font-semibold text-4xl mb-10 flex flex-col md:flex-row justify-center items-center md:items-baseline">
                        My {data.films.length} Films<span className="text-2xl opacity-70">({data.creator})</span>
                    </h3>
                    <FilmList films={data.films}/>
                </div>
            }
        </>
    );
}