var React = require('react');
var PetModel = require('../models/PetModel');

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	        pet: null  
	    };
	},
	componentWillMount: function() {
	    var query = new Parse.Query(PetModel);
	    query
	    .get(this.props.petId)
	    .then(
	    	(pet) => {
	    		this.setState({ pet: pet })
	    		console.log(pet);
	    	},
	    	(err) => {
	    		console.log(err);
	    	}
	    );
	},
	render: function() {
		var content = <div>loading...</div>;

		if(this.state.pet) {
			var colors = this.state.pet.get('colors') || [];
			content = (
				<div>
					<div>{this.state.pet.get('name')}</div>
					<div>{this.state.pet.get('type')}</div>
					<div>{this.state.pet.get('legLength')}</div>
					<div>{colors.join()}</div>
					<button onClick={this.deletePet} className="btn btn-danger">Delete</button>
				</div>
			);
		}

		return (
			<div className="container">
				<h1>Pet Details</h1>
				{content}
			</div>
		);
	},
	deletePet: function() {
		this.state.pet.destroy();
	}
});