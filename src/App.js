import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './App.css';
import routes from './routes';

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

        this.addToFavourites = movie => this.addToList('watchList', movie);
        this.addToWatchList = movie => this.addToList('watchList', movie);
    }

    get watchListCount () {
        return this.state.watchList.length;
    }

    get favouritesCount () {
        return this.state.watchList.length;
    }

    removeFromList (listName, movieToRemove) {
        this.setState({[listName]: this.state[listName].filter(movie => movie.id !== movieToRemove.id)});
    }

    addToList (listName, movieToAdd) {
        this.setState({[listName]: [...this.state[listName], movieToAdd]});
        this.updateLocalStorageFromState();
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

    static renderRoute (route) {
        return <Route exact={!!route.exact} path={route.path} component={route.component} key={route.path}/>;
    }

    render () {
        return (
            <Router>
                <div className="app">
                    <header className="header">
                        <h1 className="header__title">My TV Shows</h1>
                        <NavigationLinks watchCount={this.watchListCount} favouriteCount={this.favouritesCount}/>
                    </header>
                    <main className="main-content">
                        {routes.map(App.renderRoute)}
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
