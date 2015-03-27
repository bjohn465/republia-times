var React = require( "react/addons" );
var MorningScreen = require( "./morning-screen" );
var PlayScreen = require( "./play-screen" );

module.exports = React.createClass({
	displayName: "RepubliaTimes",

	mixins: [ React.addons.PureRenderMixin ],

	getInitialState() {
		return {
			day: 1,
			screen: "morning"
		};
	},

	changeToScreen( newScreen ) {
		this.setState({
			screen: newScreen
		});
	},

	renderMorningScreen() {
		return <MorningScreen
			day={this.state.day}
			onContinue={() => this.changeToScreen( "play" )} />;
	},

	renderPlayScreen() {
		return <PlayScreen day={this.state.day} />;
	},

	render() {
		var screen = this.state.screen;
		var screenRenderFunction = {
			morning: this.renderMorningScreen,
			play: this.renderPlayScreen
		}[ screen ];

		if ( screenRenderFunction === undefined ) {
			throw new Error( "Invalid screen '" + screen +"'" );
		}

		return screenRenderFunction();
	}
});
