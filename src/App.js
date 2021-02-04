import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {getUser} from './services/auth';
import routes from './routes';
import { isAuthenticated } from "./services/auth";
import './styles.css';
import { Container } from 'reactstrap';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ 
            pathname: "/login", 
            state: { from: props.location } }}  
          />
        )
    }
  />
);

class App extends Component {
  
  getRoutes = routes => {
    return routes.map((prop, key) => {
        if (!!prop.isAuth) {
            return (<PrivateRoute
              path={prop.path}
              component={prop.component}
              key={key}
            />);
        }
        if((prop.path === '/login' || prop.path === '/redef_senha') && getUser() !== null){
          return (<Redirect from={prop.path} to='/inicio' />);
        }
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          >
          </Route>
        );
    });
  };

  render() {
    return (
     <BrowserRouter>
      <Switch>
        <Container classname="main">{this.getRoutes(routes)}
        </Container>
        <Redirect exact={true} from="/" to="/login"/>
      </Switch>
     </BrowserRouter>
    );
  }
}

export default App;