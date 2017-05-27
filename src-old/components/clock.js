const React = require( "react/addons" );
const PropTypes = React.PropTypes;

function leadingZero( num ) {
	return ( num < 10 ? "0" : "" ) + num;
};

function formatTime( timeObj ) {
	return leadingZero( timeObj.hours ) + ":" +
		leadingZero( timeObj.minutes ) + ":" +
		leadingZero( timeObj.seconds );
};

const Clock = React.createClass({
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

module.exports = Clock;
