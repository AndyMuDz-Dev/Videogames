import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllGames, getAllGenres } from './redux/action';
import Bienvenida from './components/bienvenida/bienvenida';
import Cards from './components/Cards/Cards';
import Navigation from './components/Navigation/Navigation';
import Pagination from './components/Pagination/Pagination';
import routered from './helpers/Routes.helper';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Route
          path='/'
          render={({ location }) => (
            <>
              {location.pathname !== routered.Bienvenida && <Navigation />}
              <Switch>
                <Route
                  exact
                  path={routered.Bienvenida}
                  component={Bienvenida}
                />
                <Route exact path={routered.Home}>
                  <Cards />
                  <Pagination />
                </Route>
              </Switch>
            </>
          )}
        />
      </Router>
    </div>
  );
};

export default App;
