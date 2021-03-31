import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from 'react-router-dom'

import MyList from './templates/MyList'
import UserList from './templates/UserList'
import FilmPage from './templates/FilmPage'
import About from './templates/AboutPage'

import Logo from './images/blue_long.svg'
import HeaderLogo from './images/pop-corn.png'

const Container = ({children}) => (
    <div className="overflow-x-hidden min-h-screen flex flex-col">
        <header className="relative bg-blue-600 h-16 lg:h-20">
            <div className="px-4 max-w-screen-xl text-sm md:text-base font-medium text-blue-100 mx-auto flex justify-between items-center h-full">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-6"><img className="object-fit" src={HeaderLogo} /></div>
                    <h1>My 100 Films</h1>
                </Link>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <NavLink exact={true} to="/" activeClassName="underline">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" activeClassName="underline">About</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <main className="flex-1">
            <div className="max-w-screen-xl mx-auto relative">
                {children}
            </div>
        </main>
        <footer>
            <div className="max-w-screen-xl mx-auto my-12 px-4">
                <div className="text-center text-blue-100">
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                        <h3 className="text-lg md:text-2xl font-semibold">API Provided By:</h3>
                        <img className="w-72" src={Logo} />
                    </div>
                    <h3 className="mt-4 text-base md:text-xl font-semibold">Copyright © <a className="text-blue-200 underline" href="https://brant.work">BDMESSENGER</a> 2020</h3>
                </div>
            </div>
        </footer>
    </div>
)

export default function App() {

    return(
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/">
                        <MyList/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route 
                        path="/list/:listId" 
                        render={props => <UserList key={window.location.pathname} {...props.match.params}/>}
                    />
                    <Route 
                        path="/film/:filmId"
                        render={props => <FilmPage key={window.location.pathname} {...props.match.params}/>}
                    />
                    <Route path="*">
                        <div className="mt-20 text-center h-48  text-blue-100 font-semibold">
                            <h1 className="text-5xl">404: Page Not Found</h1>
                            <div className="mt-8">
                                <Link to="/" className="underline text-blue-200 text-3xl">Click To Main Page.</Link>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}