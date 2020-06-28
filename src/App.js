import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isMobile: false,
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

    // default value
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
            r.nameSearch = '<span class="search-match-name">' + r.name + '</span>';
            return true;
          } else {
            delete r.nameSearch;
          }

          if (r.neighborhood.toLowerCase().indexOf(input) !== -1) {
            r.neighborhoodSearch = '<span class="search-match-neighborhood">' + r.neighborhood + '</span>';
            return true;
          } else {
            delete r.neighborhoodSearch;
          }

          if (r.cuisine.toLowerCase().indexOf(input) !== -1 && r.cuisine) {
            r.cuisineSearch = '<span class="search-match">' + r.cuisine + '</span>';
            return true;
          } else {
            delete r.cuisineSearch;
          }

        })
        .sort(function(a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
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
            } else if (r.cuisine !== undefined){
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
        <div id="header-line"></div>
        <div className="App">
          <div className="App-header">
            <nav>
              <span id="header">we shop black</span>
              <ul>
                <button> 🞬 </button>
                <li><a href="#">new business</a></li>
                <li><a href="#">contact</a></li>
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
                      <td>{numRestos} Restaurants in LA County</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

export default App;
