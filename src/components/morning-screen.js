var React = require( "react/addons" );
var MorningScreenHeader = require( "./morning-screen-header" );
var MorningScreenFooter = require( "./morning-screen-footer" );
var PropTypes = React.PropTypes;

module.exports = React.createClass({
	displayName: "MorningScreen",

	mixins: [ React.addons.PureRenderMixin ],

	propTypes: {
		day: PropTypes.number.isRequired,
		onContinue: PropTypes.func
	},

	handleButtonClick() {
		this.props.onContinue && this.props.onContinue();
	},

	render() {
		return (
			<div>
				<MorningScreenHeader />
				<h2>Day {this.props.day}</h2>
				<p>TODO: Message</p>
				<button type="button" onClick={this.handleButtonClick}>
					Start Work
				</button>
				<MorningScreenFooter />
			</div>
		);
	}
});
