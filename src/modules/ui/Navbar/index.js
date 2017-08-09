import React, {Component} from 'react'
import './Navbar.css'

export default class Navbar extends Component {
	render(){
		return (
			<nav className="pt-navbar">
				<div className="pt-navbar-group pt-align-left">
					<div className="pt-navbar-heading"><a href="/">Foodism</a><span className="tagline">&nbsp; | <small><i>Where you will find food</i></small></span></div>
				</div>
			</nav>
		)
	}
}