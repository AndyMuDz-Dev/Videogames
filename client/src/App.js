import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

//routes
import routered from './helpers/Routes.helper';

//components
import Bienvenida from './components/bienvenida/bienvenida';
import Cards from './components/Cards/Cards';
import Navigation from './components/Navigation/Navigation';

function App() {
  const [videogames, setVideogames] = useState([]);

  const onSearch = async (name) => {
    try {
      const response = await fetch(
        `http://localhost:3001/videogames/name?search=${name}`
      );
      const data = await response.json();
      setVideogames([...videogames, data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <Router>
        <Route
          render={({ location }) => (
            <>
              {location.pathname !== routered.Bienvenida && (
                <Navigation onSearch={onSearch} />
              )}
              <Switch>
                <Route
                  exact
                  path={routered.Bienvenida}
                  component={Bienvenida}
                />
                <Route
                  exact
                  path={routered.Home}
                  render={() => <Cards videogames={videogames} />}
                />
              </Switch>
            </>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
