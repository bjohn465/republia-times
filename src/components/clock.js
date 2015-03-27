var React = require( "react/addons" );

module.exports = React.createClass({
	displayName: "Clock",

	mixins: [ React.addons.PureRenderMixin ],

	render() {
		return (
			<div>Clock</div>
		);
	}
});
