import { h, Component } from 'preact';


// Set initial state
let state = { count: 5 };


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = state;
  }

  componentWillUnmount() {
    // Remember state for the next mount
    state = this.state;
  }

  render() {
    return (
    	<div>
    	<br/>
    		<h1>Home</h1>
	      <button
	        color={this.props.color}
	        onClick={() => this.setState(state => ({count: state.count + 1}))}>
	        Count: {this.state.count}
	      </button>
	    </div>
    );
  }
}