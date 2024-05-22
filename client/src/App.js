import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
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

  console.log(getAllGames());
  return (
    <div className='App'>
      <Router>
        <Route
          path='/'
          render={({ location }) => (
            <>
              {location.pathname !== routered.Bienvenida && (
                <>
                  <Navigation />
                  <Pagination />
                </>
              )}
              <Switch>
                <Route
                  exact
                  path={routered.Bienvenida}
                  component={Bienvenida}
                />
                <Route exact path={routered.Home} component={Cards} />
              </Switch>
            </>
          )}
        />
      </Router>
    </div>
  );
};

export default App;
