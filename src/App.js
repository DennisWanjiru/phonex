import React, { Component } from 'react';
import './App.css';
import Row from './Row';

export default class App extends Component {
  state = {
    amount: null,
    numbers: [],
    error: null,
    asc: false
  }

  componentDidMount() {
    const numbers = JSON.parse(localStorage.getItem('numbers'));
    if(numbers && numbers.length > 0) {
      this.setState({ numbers })
    }
  }


  generateNumbers = (e) => {
    e.preventDefault()
    const { amount } = this.state;
    const numbers = [];

    if(amount > 0 && amount < 10001) {
      for(let i = 0; i < amount; i++) {
        const rand = Math.ceil(Math.random() * 100000000) + '';
        if (rand.length < 8) {
          numbers.push('07' + rand + Math.floor(Math.random() * 10));
        } else if (rand.length > 8) {
          numbers.push('07' + rand.slice(0, -1));
        } else {
          numbers.push('07' + rand)
        }
      }
    }

    this.setState({ numbers });
    localStorage.setItem('numbers', JSON.stringify(numbers));
  }

  handleChange = e => {
    this.setState({ amount: e.target.value });
  }

  handleSort = e => {
    e.preventDefault();
    const { asc, numbers } = this.state;

    this.setState({ asc: !asc });

    if(!asc) {
      this.setState({numbers: numbers.sort()})
    } else {
      this.setState({ numbers: numbers.reverse() })
    }
  }

  render() {
    const { numbers, error, amount } = this.state;
    const disable = amount > 10000 || amount < 1;
    console.log(amount, disable)

    return (
      <div className="page">
        <div className="card">
          <div>
            <h1>PhoneX</h1>
            <form>
              <div className="form-input">
                <input
                type="number"
                placeholder="Amount to be generated"
                onChange={this.handleChange}
                className={error ? 'error-input' : ''}
                />
                {disable && amount !== null && <div className="error">Amount must be between 1 - 10000</div>}
              </div>
              <button type="submit" onClick={this.generateNumbers} disabled={disable}>Generate</button>
            </form>
          </div>

          <p>Random Phone Number Generator App</p>
        </div>
        <div className="card">
          <Row data={{ index: "Index", phone: 'Phone Numbers' }} onClick={this.handleSort}/>
          {numbers.map((phone, idx) => <Row key={idx} data={{ index: idx + 1, phone }} />)}
        </div>
      </div>
    );
  }
}
