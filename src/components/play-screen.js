var React = require( "react/addons" );

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
				<p>TODO: Play Screen</p>
			</div>
		);
	}
});
