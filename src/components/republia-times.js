var React = require( "react" );
var MorningScreen = require( "./morning-screen" );

module.exports = React.createClass({
	displayName: "RepubliaTimes",

	getInitialState() {
		return {
			day: 1
		};
	},

	render() {
		return <MorningScreen day={this.state.day} />;
	}
});
