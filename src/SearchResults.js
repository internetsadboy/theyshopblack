import React, { Component } from 'react';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    return (
      <div id="search-results">
        <div>
          <table>
            <tbody>
              <tr>
                <td id="search-summary">{this.props.numRestos} Restaurants in LA County</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 id="search-listing-format">restaurant | neighborhood | cuisine</h3>
        <ul>
          {this.props.list}
        </ul>
      </div>
    )
  }
}

export default SearchResults;
