import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {getUser} from './services/auth';
import routes from './routes';
import { isAuthenticated } from "./services/auth";
import './styles.css';
import { Container } from 'reactstrap';
import  Footer  from './components/footer';

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
          if (getUser() !== null) {
              return (<Redirect from={prop.path} to={prop.notPath} />);
          } 
          return (
            <PrivateRoute
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        if((prop.path === '/login' || prop.path === '/cadastro_usuario') && getUser() !== null){
          return (<Redirect from={prop.path} to='/inicio' />);
        }
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
    });
  };

  render() {
    return (
     <BrowserRouter>
      <Switch>
        <Container className="main">{this.getRoutes(routes)} <Footer /></Container>      
      </Switch>
     </BrowserRouter>
    );
  }
}

export default App;