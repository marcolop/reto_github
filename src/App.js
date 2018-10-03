import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './App.css';

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
     input: '',
     items: [],
     total: 0
   };
   this.handleInputChange = this.handleInputChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  handleSubmit = () => {
   axios.get(`https://api.github.com/search/repositories?q=tetris`,this.state.input)
     .then(res =>
       this.setState({items: res.data.items,total: res.data.total_count})
     ).catch(err => {
       alert('error')
     });
   }
  render() {
    return (
     <div className="App">
        <h1>Reto Github</h1>
           <div className="form">
              <Input placeholder="Search" value= {this.state.input}
                      onChange={this.handleInputChange}/>
              <Button  variant="contained" color="primary"
                onClick = {this.handleSubmit}>
                Search
              </Button>
          </div>
          <div className="results">
             <h2>Total: {this.state.total}</h2>
             <ul>{this.state.items.map(items => {
              return <li key={items.id}>
                {items.full_name}
              </li>
             })}
           </ul>
          </div>
       </div>
    )
  }
}
export default App;