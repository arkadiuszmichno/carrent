import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from  '../router';
import '../App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <React.Fragment>
            <div className="​app​">​{routes}​</div>
          </React.Fragment>
          
        </Router>
    );
  }
}

export default App;
