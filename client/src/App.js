import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Bienvenida from './components/bienvenida/bienvenida';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={Bienvenida} />
      </Router>
    </div>
  );
}

export default App;
