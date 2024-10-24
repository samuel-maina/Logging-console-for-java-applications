import './App.css';
import Home from './Home'
import axios from 'axios';
import Tenant from './Tenant';
import SetAuthToken from './SetAuthToken';
import RouteGuard from './RouteGuard';
import Login from './Login';
import Logout from './Logout';
import Users from './Users';
import {BrowserRouter as Router, Route, Routes, Switch, withRouter}
from 'react-router-dom';

function App() {

    axios.defaults.baseURL = 'http://192.168.0.102:8080';
    const token = localStorage.getItem("Admintoken");
    if (token) {
        SetAuthToken(token);
    }

    return (
            <div className="App">
                <Router>
                    <Switch>
                    <RouteGuard exact path="/home/" component={Home}/>
                    <RouteGuard exact path="/" component={Home}/>
                    <RouteGuard exact path="/users" component={Users}/>
                    <RouteGuard exact path="/tenant" component={Tenant}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path ="/login/" component={Login}/>
                    </Switch>
                </Router>
            </div>
            );
}

export default App;
