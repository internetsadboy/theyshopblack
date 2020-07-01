import React, { Component } from 'react';

import Navigation from './Navigation';

class NewBusiness extends Component {

  constructor(props) {
    super(props);

    this.state = null;
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <main>
          <h1>new biz pg</h1>
        </main>
      </div>
    )
  }
}

export default NewBusiness;
