import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    allSushis: [],
    startIndex: 0,
    money: 100
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(sushis => this.setState({
      allSushis: sushis
    }))
  }

  getSushis = () => {
    return this.state.allSushis.slice(this.state.startIndex, this.state.startIndex+4)
  }

  moreSushis = () => {
    this.setState({
      startIndex: this.state.startIndex+4
    })
  }

  updateSushis = (id, price) => {
    if (this.state.money-price >= 0){
      this.setState({
        allSushis: this.state.allSushis.map(sushi => {
          if (sushi.id === id){
            return {...sushi, eaten: true}
          }else{
            return sushi
          }
        }),
        money: this.state.money - price

      })
    }
  }

  render() {
    let eatenSushi = this.state.allSushis.filter(sushi => sushi.eaten === true)
    return (
      <div className="app">
        <SushiContainer sushis={this.getSushis()} moreSushis={this.moreSushis} eatSushi={this.updateSushis}/>
        <Table money={this.state.money} sushiPlate={eatenSushi}/>
      </div>
    );
  }
}

export default App;