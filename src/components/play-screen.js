var React = require( "react/addons" );
var Clock = require( "./clock" );
var elapsedTimeToClockTime = require( "../util/elapsedTimeToClockTime" );
var PropTypes = React.PropTypes;

const dayLength = 60;
const workingHours = 12;
const startingHour = 6;

elapsedTimeToClockTime = elapsedTimeToClockTime.bind(
	null,
	startingHour,
	workingHours,
	dayLength
);

module.exports = React.createClass({
	displayName: "PlayScreen",

	mixins: [ React.addons.PureRenderMixin ],

	propTypes: {
		day: PropTypes.number.isRequired,
		readers: PropTypes.number.isRequired,
		loyalty: PropTypes.number.isRequired
	},

	getInitialState() {
		return {
			time: 0
		};
	},

	componentDidMount() {
		this.prevTimestamp = null;
		this.requestUpdate();
	},

	componentWillUnmount() {
		cancelAnimationFrame( this.requestId );
	},

	requestUpdate() {
		if ( this.state.time < dayLength ) {
			this.requestId = requestAnimationFrame( this.updateTime )
		}
	},

	updateTime( timestamp ) {
		var elapsedSeconds;

		if ( this.prevTimestamp === null ) {
			this.prevTimestamp = timestamp;
		}
		elapsedSeconds = ( timestamp - this.prevTimestamp ) / 1000;
		this.prevTimestamp = timestamp;

		this.setState(
			{
				time: Math.min( this.state.time + elapsedSeconds, dayLength )
			},
			this.requestUpdate
		);
	},

	render() {
		return (
			<div>
				<h1>Day {this.props.day}</h1>
				<Clock time={elapsedTimeToClockTime( this.state.time )} />
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
