import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AddEducation from "./components/profile-forms/AddEducation";
import AddExperience from "./components/profile-forms/AddExperience";
import Alert from "./components/layout/Alert";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profiles from "./components/profiles/Profiles";

import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import EditProfile from "./components/profile-forms/EditProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profiles" component={Profiles} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/addEducation" component={AddEducation} />
              <Route path="/addExperience" component={AddExperience} />
              <PrivateRoute path="/createProfile" component={CreateProfile} />
              <PrivateRoute path="/editProfile" component={EditProfile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
