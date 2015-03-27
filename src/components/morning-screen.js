var React = require( "react" );

module.exports = React.createClass({
	displayName: "MorningScreen",

	propTypes: {
		day: React.PropTypes.number.isRequired
	},

	render() {
		return (
			<div>
				<h1>The Republia Times</h1>
				<h2>Day {this.props.day}</h2>
			</div>
		);
	}
});
