var React = require( "react/addons" );

module.exports = React.createClass({
	displayName: "MorningScreenHeader",

	mixins: [ React.addons.PureRenderMixin ],

	render() {
		return (
			<header>
				<h1>The Republia Times</h1>
			</header>
		);
	}
});
