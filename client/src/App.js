// Module imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Component imports
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home';
import About from './components/pages/About';

// Context/State imports
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState'

// Style imports
import './App.css';

const App = () => {
  return (
    <AuthState>
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
    </AuthState>
  );
}

export default App;
