var React = require( "react" );

module.exports = React.createClass({
	displayName: "MorningScreen",

	propTypes: {
		day: React.PropTypes.number.isRequired
	},

	render() {
		return (
			<div>
				<header>
					<h1>The Republia Times</h1>
				</header>
				<h2>Day {this.props.day}</h2>
				<p>TODO: Message</p>
				<button type="button">Start Work</button>
				<footer>
					<div>by</div>
					<div>Lucas Pope</div>
					<div><a href="https://twitter.com/dukope">@dukope</a></div>
					<div>Ported by</div>
					<div>Brandon Johnson</div>
					<div>
						<a href="https://twitter.com/bjohn465">@bjohn465</a>
					</div>
				</footer>
			</div>
		);
	}
});
