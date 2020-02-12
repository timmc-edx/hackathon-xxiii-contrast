import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BackgroundColorTest from './Tests/BackgroundColorTest';
import { SHA3 } from 'sha3';
 

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
    this.setUser = this.setUser.bind(this);
    this.emailInput = React.createRef();
  }

  setUser(event) {
    event.preventDefault();
    const email = this.emailInput.current.value;
    const hash = new SHA3(224).update(email).digest('hex');

    this.setState({
      user: hash,
    });
  }

  getEmailCollectionForm() {
    return (
      <div>
        <form onSubmit={this.setUser}>
          <div className="form-group">
            <label htmlFor="user-email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="user-email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              ref={this.emailInput}
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Make the world better</h1>
          </header>
        </div>
        {!user && this.getEmailCollectionForm()}
        {user && <BackgroundColorTest user={user} />}
      </React.Fragment>
    );
  }
}

export default App;
