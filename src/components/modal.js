const React = require( "react" );

const coverStyle = {
	backgroundColor: "hsla(0,1%,50%,0.5)",
	position: "fixed",
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	zIndex: 998
};

const modalStyle = {
	border: "1px solid #000",
	backgroundColor: "#fff",
	position: "fixed",
	top: "50%",
	left: "50%",
	marginTop: "-12.5%",
	marginLeft: "-12.5%",
	width: "25%",
	height: "25%",
	zIndex: 999
};

const Modal = React.createClass({
	render() {
		return (
			<div>
				<div style={coverStyle}></div>
				<div style={modalStyle}>
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = Modal;
