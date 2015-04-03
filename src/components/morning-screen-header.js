const React = require( "react/addons" );

const MorningScreenHeader = React.createClass({
	mixins: [ React.addons.PureRenderMixin ],

	render() {
		return (
			<header>
				<h1>The Republia Times</h1>
			</header>
		);
	}
});

module.exports = MorningScreenHeader;
