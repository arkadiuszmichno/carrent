import React, {Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from  '../router';
import '../App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <React.Fragment>
            <div className="âappâ">â{routes}â</div>
          </React.Fragment>
          
        </Router>
    );
  }
}

export default App;
