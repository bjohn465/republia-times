var React = require( "react" );
var MorningScreenHeader = require( "./morning-screen-header" );
var MorningScreenFooter = require( "./morning-screen-footer" );

module.exports = React.createClass({
	displayName: "MorningScreen",

	propTypes: {
		day: React.PropTypes.number.isRequired
	},

	render() {
		return (
			<div>
				<MorningScreenHeader />
				<h2>Day {this.props.day}</h2>
				<p>TODO: Message</p>
				<button type="button">Start Work</button>
				<MorningScreenFooter />
			</div>
		);
	}
});
