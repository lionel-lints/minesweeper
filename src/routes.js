import Base from './containers/Base';
import HomePage from './containers/HomePage';
import GamePage from './containers/GamePage';
import Dashboard from './containers/Dashboard';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import Auth from './modules/Auth';

const routes = {
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Dashboard);
        } else {
          callback(null, HomePage);
        }
      },
    },
    {
      path: '/anon',
      component: GamePage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/signup',
      component: SignUpPage,
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      },
    },
  ],
};

export default routes;
