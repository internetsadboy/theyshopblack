import React, { Component } from 'react';

class TextSearch extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    return (
      <div id="search-form">
        <form>
          <input
            type="text"
            autoFocus={true}
            placeholder="Search 'downtown', 'jamaican', or 'coffee'"
            value={this.props.input}
            onChange={this.props.handleChange}
          />
        </form>
      </div>
    )
  }
}

export default TextSearch;
