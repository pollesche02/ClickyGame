import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron/index";
import Navbar from "./components/Navbar/index";
import Card from "./components/Card/index";
import Footer from "./components/Footer/index";
import products from "./products.json";

class App extends Component {
  
  state = {
    products,
    score: 0,
    highScore: 0,
    clicked: []
  };
  
  shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
 
  cardClick = (e) => {
    this.shuffleCards(products);
    let idClicked = e.target.id;
    if (this.state.clicked.includes(idClicked)) {
      this.setState({
        clicked: [],
        score: 0,
        products: products
      });
      alert("Please Try Again!");
    } else {
      if (this.state.score >= this.state.highScore) {
        this.setState({
          score: this.state.score + 1,
          highScore: this.state.score + 1,
          products: products,
          clicked: this.state.clicked.concat(idClicked) //concat will join all my strings of product together
        });
      } else {
        this.setState({
          score: this.state.score + 1,
          products: products,
          clicked: this.state.clicked.concat(idClicked)
        });
      };
    };
  };
  render() {
    return (
      <div className="container-fullwidth">
        <Navbar
          score={this.state.score}
          highScore={this.state.highScore}
        />
        <Jumbotron />
        {this.state.products.map(product => (
          <Card
            cardClick={this.cardClick}
            key={product.id}
            name={product.name}
            image={product.image}
            id={product.id}
          />
        ))}
        <Footer />
      </div>
    );
  }
}

export default App;
