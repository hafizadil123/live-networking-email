import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const Home = lazy(() => import('./components/home'));
const Login = lazy(() => import('./components/login'));
const Role = lazy(() => import('./components/role'));
const Store = lazy(() => import('./components/store'));
const Email = lazy(() => import('./components/email'));



function App() {
  return (
    <Router>
       <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/" component={Home} />
      
      <Route path="/login" component={Login} />
       
      <Route path="/store" component={Store} />
      
      <Route path="/role" component={Role} />
      
      <Route path="/email" component={Email} />
      
    </Switch>
    </Suspense>
  </Router>
  );
}

export default App;
