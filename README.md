# My 100 Films
Web application showcasing a list of hundred films and have the ability to view a film's release information by using <a href="https://www.themoviedb.org/documentation/api">TMDb's API</a>.  

### API Routes:
*/film/:id* -- To view a film's release information. The id can be obtained by searching a film at <a href="https://www.themoviedb.org">TMDb</a>.  
**Example**: https://www.themoviedb.org/movie/157336-interstellar => .../film/157336  

/list/:id -- To view a list of movies that a user has created on TMDb.  
**Example**: https://www.themoviedb.org/list/5802933 => .../list/5802933  

### Installation

``` bash
$ npm install
$ npm install -D
```

### TMDb's API Key is required!
To get their API key, you first need to register an account at https://themoviedb.org/. Once you registered and logged in, then you need to go to https://www.themoviedb.org/settings/api, and under "API Key (v3 auth)" is your API key.

Once you backup your key, navigate to the project's directory, create a .env file and paste your key after 'API_KEY=':
``` bash
$ cd my100films-v2
$ touch .env
```
.env file:
```
API_KEY=<<INSERT API KEY>>
LIST_ID='5802933' <-- My list id (you can create a list on TMDb's website and add films to it) for the homepage. You can modify the id to your list's id.
```

### Development
``` bash
$ npm run dev
```

Development server runs at http://localhost:3000
