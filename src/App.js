import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './App.css';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import WatchList from './pages/WatchList';

function NavigationLinks ({watchCount, favouriteCount}) {
    const className = 'header__navigation__links';
    const activeClassName = 'header__navigation__links--active';
    return (
        <nav className="header__navigation">
            <NavLink className={className} exact={true} activeClassName={activeClassName} to="/">
                Home
            </NavLink>
            <NavLink className={className} exact={true} activeClassName={activeClassName} to="/watch-list">
                Watch List ({watchCount})
            </NavLink>
            <NavLink className={className} exact={true} activeClassName={activeClassName} to="/favourites">
                Favourites ({favouriteCount})
            </NavLink>
        </nav>
    );
}

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            watchList: App.loadFromLocalStorage('movies.watchList', []),
            favourites: App.loadFromLocalStorage('movies.favourites', []),
        };

        this.addToFavourites = movie => this.addToList('favourites', movie);
        this.addToWatchList = movie => this.addToList('watchList', movie);
        this.addToWatchList.bind(this);
        this.addToFavourites.bind(this);
    }

    get watchListCount () {
        return this.state.watchList.length;
    }

    get favouritesCount () {
        return this.state.favourites.length;
    }

    removeFromList (listName, movieToRemove) {
        this.setState({[listName]: this.state[listName].filter(movie => movie.id !== movieToRemove.id)});
    }

    addToList (listName, movieToAdd) {
        this.setState({[listName]: [...this.state[listName], movieToAdd]});
        this.updateLocalStorageFromState();
    }

    existsInList (listName, movieToCheck) {
        return this.state[listName].some(movie => movie.id === movieToCheck.id);
    }

    updateLocalStorageFromState () {
        App.saveToLocalStorage('movies.watchList', this.state.watchList);
        App.saveToLocalStorage('movies.favourites', this.state.favourites);
    }

    static saveToLocalStorage (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    static loadFromLocalStorage (key, defaultValue) {
        const storageItem = window.localStorage.getItem(key);
        return !!storageItem ? JSON.parse(storageItem) : defaultValue;
    }

    render () {
        const helper = {
            watchList: {
                add: movie => this.addToList('watchList', movie),
                remove: movie => this.removeFromList('watchList', movie),
                contains: movie => this.existsInList('watchList', movie),
            },
            favourites: {
                add: movie => this.addToList('favourites', movie),
                remove: movie => this.removeFromList('favourites', movie),
                contains: movie => this.existsInList('favourites', movie),
            },
        };
        return (
            <Router>
                <div className="app">
                    <header className="header">
                        <h1 className="header__title">My TV Shows</h1>
                        <NavigationLinks watchCount={this.watchListCount} favouriteCount={this.favouritesCount}/>
                    </header>
                    <main className="main-content">
                        <Route exact
                               path="/"
                               render={props => <Home {...props} {...helper}/>}/>
                        <Route exact
                               path="/watch-list"
                               render={props => <WatchList {...props} {...helper} movies={this.state.watchList}/>}/>
                        <Route exact
                               path="/favourites"
                               render={props => <Favourites {...props} {...helper} movies={this.state.favourites}/>}/>
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
