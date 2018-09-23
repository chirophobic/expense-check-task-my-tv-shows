import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './App.css';
import routes from './routes';

function NavigationLinks ({watchCount, favouriteCount}) {
    return (
        <Fragment>
            <NavLink exact={true} activeClassName="foobar" to="/">Home</NavLink>
            <NavLink exact={true} activeClassName="foobar" to="/watch-list">Watch List ({watchCount})</NavLink>
            <NavLink exact={true} activeClassName="foobar" to="/favourites">Favourites ({favouriteCount})</NavLink>
        </Fragment>
    );
}

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            watchList: [],
            favourites: [],
        };
    }

    static renderRoute (route) {
        return <Route exact={!!route.exact} path={route.path} component={route.component} key={route.path}/>;
    }

    render () {
        return (
            <Router>
                <div className="App">
                    <header className="header">
                        <h1 className="App-title">Welcome to React</h1>
                        <NavigationLinks watchCount={this.state.watchList.length} favouriteCount={this.state.favourites.length}/>
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
