import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    return (
      <div className="App-header">
        <nav>
          <span id="header">
            <Link to="/">we shop black</Link>
          </span>
          <ul>
            <button> 🞬 </button>
            <li>
              <Link to="/new-business">new business</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
