var React = require( "react" );

module.exports = React.createClass({
	displayName: "RepubliaTimes",

	getInitialState() {
		return {
			day: 1
		};
	},

	render() {
		return (
			<h1>The Republia Times</h1>
		);
	}
});
