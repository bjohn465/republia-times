var React = require( "react/addons" );
var Clock = require( "./clock" );
var PropTypes = React.PropTypes;

module.exports = React.createClass({
	displayName: "PlayScreen",

	mixins: [ React.addons.PureRenderMixin ],

	propTypes: {
		day: PropTypes.number.isRequired,
		readers: PropTypes.number.isRequired,
		loyalty: PropTypes.number.isRequired
	},

	render() {
		return (
			<div>
				<h1>Day {this.props.day}</h1>
				<Clock />
				<div>6 AM - 6 PM</div>
				<button type="button">End Day</button>

				<h2>Readers</h2>
				<div>{this.props.readers}</div>

				<h2>Loyalty</h2>
				<div>{this.props.loyalty}</div>

				<h2>News Feed</h2>
				<ul>
					<li>Story 1</li>
					<li>Story 2</li>
				</ul>

				<div>Drag Articles to Paper</div>

				<h2>The Republia Times</h2>
			</div>
		);
	}
});
