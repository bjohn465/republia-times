const React = require( "react/addons" );
const Clock = require( "./clock" );
const PropTypes = React.PropTypes;
const dayLength = 60;
const workingHours = 12;
const startingHour = 6;
const elapsedTimeToClockTime = require( "../util/elapsedTimeToClockTime" ).bind(
	null,
	startingHour,
	workingHours,
	dayLength
);
const newsItems = require( "../data/news-items" );

function renderNewsFeedItem( item ) {
	var blurb = item.get( "blurb" );
	return (
		<li key={blurb}>{blurb}</li>
	);
}

const PlayScreen = React.createClass({
	mixins: [ React.addons.PureRenderMixin ],

	propTypes: {
		day: PropTypes.number.isRequired,
		readers: PropTypes.number.isRequired,
		loyalty: PropTypes.number.isRequired
	},

	getInitialState() {
		return {
			time: 0,
			speed: this.props.day === 1 ? 0.5 : 1,
			stories: newsItems.getShuffledStories().take( 10 )
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
		if ( this.prevTimestamp === null ) {
			this.prevTimestamp = timestamp;
		}
		const elapsedSeconds =
			this.state.speed * ( ( timestamp - this.prevTimestamp ) / 1000 );
		this.prevTimestamp = timestamp;

		this.setState(
			{
				time: Math.min( this.state.time + elapsedSeconds, dayLength )
			},
			this.requestUpdate
		);
	},

	handleEndDayClick() {
		this.setState({
			speed: 10
		});
	},

	render() {
		return (
			<div>
				<h1>Day {this.props.day}</h1>
				<Clock time={elapsedTimeToClockTime( this.state.time )} />
				<div>6 AM - 6 PM</div>
				<button type="button" onClick={this.handleEndDayClick}>
					End Day
				</button>

				<h2>Readers</h2>
				<div>{this.props.readers}</div>

				<h2>Loyalty</h2>
				<div>{this.props.loyalty}</div>

				<h2>News Feed</h2>
				<ul>
					{this.state.stories.map( renderNewsFeedItem )}
				</ul>

				<div>Drag Articles to Paper</div>

				<h2>The Republia Times</h2>
			</div>
		);
	}
});

module.exports = PlayScreen;
