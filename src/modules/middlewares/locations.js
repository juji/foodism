
function getBoundsRadius(bounds){
	// r = radius of the earth in km
	var r = 6378.8
	
	// degrees to radians (divide by 57.2958)
	var ne_lat = bounds.getNorthEast().lat() / 57.2958
	var ne_lng = bounds.getNorthEast().lng() / 57.2958
	var c_lat = bounds.getCenter().lat() / 57.2958
	var c_lng = bounds.getCenter().lng() / 57.2958
	
	// distance = circle radius from center to Northeast corner of bounds
	var r_km = r * Math.acos(
		Math.sin(c_lat) * Math.sin(ne_lat) + 
		Math.cos(c_lat) * Math.cos(ne_lat) * Math.cos(ne_lng - c_lng)
	)
	
	return r_km *1000 // radius in meters
}

export default globalObject => store => next => action => {

	var types = {

		LOCATION(){

			next(action)
			store.dispatch({type: 'LATLNG_SEARCH'})

			if(!globalObject.map) return


		},

		LATLNG_SEARCH(){

			if(!globalObject.place) return
			if(!globalObject.map) return
			var center = globalObject.map.getCenter()
			var output = 0 
			globalObject.place.nearbySearch({
				location: {
					lat: center.lat(),
					lng: center.lng()
				},
				radius: getBoundsRadius( globalObject.map.getBounds() ),
				type: ['restaurant']
			},(result,status, pagination)=>{

				if(!output){
					output = 1
					next(action)
				} 

				if(status !== 'OK') {
					var state = store.getState()
					if(state.markers.length) return
					return store.dispatch({
						type:'ERROR',
						data: 'Something is wrong when searching restaurants, you can try again later..'
					})
				}
				
				store.dispatch({
					type:'INCOMING_MARKERS',
					data: result
				})

				if(pagination.hasNextPage) pagination.nextPage()
					
			})

		}

	}

	if(types[action.type]) types[action.type]()
	else next(action)

}