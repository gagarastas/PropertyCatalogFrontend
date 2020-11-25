import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import Login from "./components/auth/Login";
import AllProperty from "./components/AllProperty";
import AddingPropertyForm from "./components/AddingPropertyForm";
import UpdatingPropertyForm from "./components/UpdatingPropertyForm";
import SingleProperty from "./components/SingleProperty";
import Navbar from "./components/Navbar";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    const { history } = this.props

    return (
      <div className="App">
        <Navbar history={history}/>
        <Switch>
          <Route history={history} path='/navbar' component={Navbar} />
          <Route history={history} path='/auth/login' component={Login} onEnter />
          <Route history={history} path='/auth/register' component={Register}/>
          <Route history={history} path = '/auth/logout' component={Logout}/>
          <Route history={history} path='/allProperty' component={AllProperty} />
          <Route history={history} path='/property/:id' component={SingleProperty} />
          <Route history={history} path='/addingPropertyForm' component={AddingPropertyForm} />
          <Route history={history} path='/updatingPropertyForm/:id' component={UpdatingPropertyForm} />
        </Switch>

      </div>
    );
  }
}


export default withRouter(App);
