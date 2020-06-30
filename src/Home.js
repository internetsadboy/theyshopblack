import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router-dom';


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      restaurants: null,
      input: ''
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('https://cdn.jsdelivr.net/gh/internetsadboy/isb-cdn/la-restos.json')
      .then(res => res.json())
      .then(data => this.setState({ restaurants: data.restaurants }))
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    const { restaurants, isLoading, input } = this.state;

    // default value => ALL
    let numRestos = restaurants && restaurants.length;

    let list;

    if (!restaurants) {
      list = (<p>Loading...</p>)
    } else {
      list = restaurants
        .filter((r) => {
          if (input.length < 2) {
            delete r.nameSearch;
            delete r.neighborhoodSearch;
            delete r.cuisineSearch;
            return true;
          }

          if (r.name.toLowerCase().indexOf(input) !== -1) {
            r.nameSearch = '<span class="search-match">' + r.name + '</span>';
            console.log('... input', input)
            return true;
          } else {
            delete r.nameSearch;
          }

          if (r.neighborhood.toLowerCase().indexOf(input) !== -1) {
            r.neighborhoodSearch = '<span class="search-match">' + r.neighborhood + '</span>';
            return true;
          } else {
            delete r.neighborhoodSearch;
          }

          if (r.cuisine && r.cuisine.toLowerCase().indexOf(input) !== -1) {
            r.cuisineSearch = '<span class="search-match">' + r.cuisine + '</span>';
            return true;
          } else {
            delete r.cuisineSearch;
          }
        })
        .sort(function(a, b) {
            let nameA = a && a.name && a.name.toLowerCase();
            let nameB = b && b.name && b.name.toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          }
        )
        .map((r, idx) => {
            let listing = '';

            if (r.name !== undefined && r.nameSearch) {
              listing += r.nameSearch;
            } else if (r.name !== undefined) {
              listing += r.name;
            }

            if (r.neighborhood !== undefined && r.neighborhoodSearch) {
              listing += ' | ' + r.neighborhoodSearch;
            } else if (r.neighborhood !== undefined) {
              listing += ' | ' + r.neighborhood;
            }

            if (r.cuisine !== undefined && r.cuisineSearch) {
              listing += ' | ' + r.cuisineSearch
            } else if (r.cuisine !== undefined) {
              // sometimes data pt "cuisine" not provided
              listing += ' | ' + r.cuisine;
            }

            return (
                <li
                  key={idx}
                  dangerouslySetInnerHTML={{
                    __html: listing
                  }}
                  >
                </li>
            )
        });

        numRestos = list.length;
    }


    return (
      <div>
        <div className="App">
          <div className="App-header">
            <nav>
              <span id="header">we shop black</span>
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
          <main>
            <div id="search-form">
              <form>
                <input
                  type="text"
                  autoFocus={true}
                  placeholder="Search 'downtown', 'jamaican', or 'coffee'"
                  value={input}
                  onChange={this.handleChange.bind(this)}
                />
              </form>
            </div>
            <div id="search-results">
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td id="search-summary">{numRestos} Restaurants in LA County</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 id="search-listing-format">restaurant | neighborhood | cuisine</h3>
              <ul>
              {list}
              </ul>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Home;
