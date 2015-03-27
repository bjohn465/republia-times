var React = require( "react/addons" );

module.exports = React.createClass({
	displayName: "MorningScreenFooter",

	mixins: [ React.addons.PureRenderMixin ],

	render() {
		return (
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
		);
	}
});
