var React = require( "react/addons" );
var PropTypes = React.PropTypes;

var leadingZero = function( num ) {
	return ( num < 10 ? "0" : "" ) + num;
};

var formatTime = function( timeObj ) {
	return leadingZero( timeObj.hours ) + ":" +
		leadingZero( timeObj.minutes ) + ":" +
		leadingZero( timeObj.seconds );
};

module.exports = React.createClass({
	displayName: "Clock",

	mixins: [ React.addons.PureRenderMixin ],

	propTypes: {
		time: PropTypes.shape({
			hours: PropTypes.number.isRequired,
			minutes: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired
		}).isRequired
	},

	render() {
		return (
			<time>{formatTime( this.props.time )}</time>
		);
	}
});
