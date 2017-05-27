const React = require( "react/addons" );
const MorningScreen = require( "./morning-screen" );
const PlayScreen = require( "./play-screen" );

const RepubliaTimes = React.createClass({
	mixins: [ React.addons.PureRenderMixin ],

	getInitialState() {
		return {
			day: 1,
			screen: "morning",
			readers: 200,
			loyalty: 0
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
		return <PlayScreen
			day={this.state.day}
			readers={this.state.readers}
			loyalty={this.state.loyalty} />;
	},

	render() {
		const screen = this.state.screen;
		const screenRenderFunction = {
			morning: this.renderMorningScreen,
			play: this.renderPlayScreen
		}[ screen ];

		if ( screenRenderFunction === undefined ) {
			throw new Error( "Invalid screen '" + screen +"'" );
		}

		return screenRenderFunction();
	}
});

module.exports = RepubliaTimes;
