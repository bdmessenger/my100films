import React from 'react'


const About = () => (
    <div className="px-4 mt-6 text-center lg:text-left">
        <div className="flex flex-col gap-6 w-full border-2 border-blue-800 bg-blue-300 p-4 md:p-8 rounded-md">
            <h2 className="text-blue-600 text-4xl font-bold">Welcome to My 100 Films!</h2>
            <p className="text-blue-900 text-xl">
                This web application that I've developed is showcasing my 
                hundred films that are either my favorites or that I believe 
                should be viewed by others. My web application is using 
                <a href="https://www.themoviedb.org/" className="underline text-blue-700 px-2">TMDb's</a>
                (The Movie Database) Application Programming Interface 
                (API) to fetch data that contains details about movies. 
                I registered at TMDb's website to obtain the API key and 
                create a list of films that are copy over to this site's 
                home page. If you click on any of the film panels on the home 
                page, the page will direct you to that film containing its release 
                information. If you register and create a list at TMDb, you can 
                display your list onto my site as long as you reference your list's 
                id that's in the url address once you clicked on your list.
            </p>
            <h4 className="text-blue-700 underline text-lg font-medium">
                <a href="https://developers.themoviedb.org/3/">
                    Click Here To Learn More About TMDB's API
                </a>
            </h4>
            <div>
                <h3 className="text-2xl font-semibold text-blue-900">API Endpoints:</h3>
                <div className="mt-3 mx-auto lg:mx-0 w-full md:w-96 bg-blue-700 text-blue-100 p-4 rounded-md">
                    <div className="flex gap-4 items-center">
                        <h3 className="bg-blue-900 p-2 w-20 text-center">/film/:id</h3>
                        <p>Insert id at the end of address to view the film's content.</p>
                    </div>
                    <div className="mt-4 flex gap-4 items-center">
                        <h3 className="bg-blue-900 p-2 w-20 text-center">/list/:id</h3>
                        <p>Insert id at the end of address to view a user's list.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default About