// Module imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Component imports
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home';
import About from './components/pages/About';

// Context/State imports
import ContactState from './context/contact/ContactState';

// Style imports
import './App.css';

const App = () => {
  return (
    <ContactState>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </>
      </Router>
    </ContactState>
  );
}

export default App;