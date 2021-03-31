import React from 'react'
import useFetch from 'use-http'
import FilmList from '../components/FilmList'

export default function UserList({listId}) {
    const { loading, error, data, cache } = useFetch(`/api/list/${listId}`, {
        cacheLife: (1000 * 60 * 2),
        persist: true
    }, []);


    if(error) {
        return (
            <div className="px-4 w-full flex flex-col justify-center items-center h-96 gap-4">
                <h3 className="text-blue-100 text-2xl md:text-4xl text-center font-semibold">Sorry. The list of films you're looking for is not available.</h3>
                <Link to="/" className="text-blue-200 text-xl md:text-3xl text-center font-semibold underline">Click here to return to main page.</Link>
            </div>
        );
    }
    if(loading) return (
        <div className="w-full flex justify-center">
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
                <div className="mt-10 px-4">
                    <h3 className="text-center text-blue-100 font-semibold text-4xl mb-10">
                        {data.creator}'s {data.films.length} Films
                    </h3>
                    <FilmList films={data.films}/>
                </div>
            }
        </>
    );
}