import React, { Component } from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom'
import Beers from './components/Beers'
import RandomBeer from './components/RandomBeer'
import NewBeer from './components/NewBeer'
import BeerDetail from './components/BeerDetail'
import Home from './components/Home'
import axios from 'axios';

class App extends Component {


  // DELETED CONSTRUCTOR AS IT IS NOT NECCESSARY


  state = {
    allBeers: {},
    filteredBeers: {},
    searchTerm: "",
    ready: false,
  };


  async componentDidMount() {
    await this.getBeers()
  }

  getBeers = async () => {
    axios.get('https://ih-beer-api.herokuapp.com/beers')
      .then(response => {
        let allBeers = response.data.reverse().slice(0, 20)
        let filteredBeers = response.data.reverse().slice(0, 20)
        this.setState({
          allBeers,
          filteredBeers,
          ready: true
        })
      })
  }


  searchBeers = (beer) => {
    axios.get(`https://ih-beer-api.herokuapp.com/beers/search?q=${beer}`)
      .then(response => {
        let filtered = response.data.reverse().slice(0, 20)
        console.log(filtered)
        !filtered ? this.setState({ allBeers: this.state.filteredBeers }) : this.setState({ filteredBeers: filtered })
      })
    this.setState({
      searchTerm: beer
    })
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* removed this.props.search term from searchterm, replaced with this.state.searchterms */}

          <Route exact path="/beers" render={(props) =>
            <Beers
              {...props}
              search={this.searchBeers}
              beers={this.state.filteredBeers}
              ready={this.state.ready} />}
//               replaced this.props.searchTerm for this.state.searchTerm.
            searchTerm={this.state.searchTerm}
          />


          <Route exact path="/random-beer" component={(props) => <RandomBeer {...props} ready={this.state.ready} />} />
          <Route exact path="/new-beer" component={(props) => <NewBeer {...props} />} />
          <Route path="/beers/:id" component={(props) => <BeerDetail {...props} beers={this.state.filteredBeers} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
