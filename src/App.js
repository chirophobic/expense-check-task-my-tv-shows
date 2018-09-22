import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './App.css';
import routes from './routes';

class App extends Component {
    static renderNavLink (route) {
        return <NavLink exact={true} activeClassName="foobar" to={route.path}>{route.title}</NavLink>;
    }

    static renderRoute (route) {
        return <Route exact={!!route.exact} path={route.path} component={route.component}/>;
    }

    render () {
        return (
            <Router>
                <div className="App">
                    <header className="header">
                        <h1 className="App-title">Welcome to React</h1>
                        {routes.map(App.renderNavLink)}
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
