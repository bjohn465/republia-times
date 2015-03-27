var React = require( "react/addons" );
var Clock = require( "./clock" );

module.exports = React.createClass({
	displayName: "PlayScreen",

	mixins: [ React.addons.PureRenderMixin ],

	propTypes: {
		day: React.PropTypes.number.isRequired
	},

	render() {
		return (
			<div>
				<h2>Day {this.props.day}</h2>
				<Clock />
				<div>6 AM - 6 PM</div>
				<button type="button">End Day</button>

				<p>TODO: Finish Play Screen</p>
			</div>
		);
	}
});
