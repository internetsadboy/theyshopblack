import React, { Component } from 'react';

import Navigation from './Navigation';

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = null;
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <main>
          <h1>dis da contact pg</h1>
        </main>
      </div>
    )
  }
}

export default Contact;
