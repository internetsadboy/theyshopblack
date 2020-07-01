import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router-dom';

import Navigation from './Navigation';
import TextSearch from './TextSearch';
import SearchResults from './SearchResults';

import { filterResults } from './utility'


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
      .then(() => this.setState({ isLoading: false }))
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

    if (isLoading || !restaurants) {
      list = (<p>Loading...</p>)
    } else {
      list = filterResults(input, restaurants);
      numRestos = list.length;
    }

    return (
      <div>
        <div className="App">
          <Navigation />
          <main>
            <TextSearch
              input={input}
              handleChange={this.handleChange.bind(this)}
            />
            <SearchResults
              numRestos={numRestos}
              list={list}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default Home;
