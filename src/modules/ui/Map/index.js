import React, {Component} from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import {
	Popover, PopoverInteractionKind,
	Position
} from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import './Map.css'

var constraints = [
	{
		attachment: "together",
		pin: true,
		to: "window"
	}
];

class MapMarker extends Component{
	render(){
		return (
			<Popover
                interactionKind={PopoverInteractionKind.HOVER}
                popoverClassName="pt-popover-content-sizing"
                position={Position.TOP_LEFT}
                tetherOptions={{constraints:constraints}}
            >
            	<span className="map-marker pt-icon-map-marker pt-icon-large"></span>
                <div>
                    <h5>{this.props.restaurant.name}</h5>
                    <p>{this.props.restaurant.vicinity}</p>
                    <p><Link to={"/restaurant/"+this.props.restaurant.place_id}>View Details</Link></p>
                </div>
            </Popover>
		);
	}
}

class Map extends Component {

	componentDidMount(){
		if(navigator.geolocation)
			navigator.geolocation.getCurrentPosition((pos)=>{
				if(pos) this.props.dispatch({
					type: 'LOCATION',
					data: pos
				})
			})
	}

	onGoogleApiLoaded(data){
		this.props.dispatch({
			type:'MAP',
			data: data
		})
	}

	renderMarkers(){
		var len = this.props.markers.index.length
		var elms = []
		for(var i=0;i<len;i++){
			let id = this.props.markers.index[i],
				marker = this.props.markers.data[ id ]
			elms.push(
				<MapMarker
					key={id}
					lat={marker.geometry.location.lat()}
					lng={marker.geometry.location.lng()}
					restaurant={marker}
					id={id}
				/>
			)
		}
		return elms
	}

	onChange(){
		this.props.dispatch({type: 'LATLNG_SEARCH'})
	}

	render(){
		return (
			<div className="map_container">
				<GoogleMapReact
					bootstrapURLKeys={{
						key: 'AIzaSyCaiuIyOIGfIhxAAdoQjij5ma3TyF9r_1o',
						libraries: 'places'
					}}
					yesIWantToUseGoogleMapApiInternals={true}
					onGoogleApiLoaded={this.onGoogleApiLoaded.bind(this)}
			        center={{lat: this.props.location.lat, lng: this.props.location.lng}}
			        defaultZoom={17}
			        onChange={this.onChange.bind(this)}
      			>{this.renderMarkers()}</GoogleMapReact>
			</div>
		)
	}
}

export default connect(state => ({location: state.location, markers: state.markers}))(Map)