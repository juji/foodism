

export default globalObject => store => next => action => {

	var types = {

		MAP(){

			globalObject.map = action.data.map
			if(!globalObject.place) globalObject.place = new action.data.maps.places.PlacesService(globalObject.map)
			if(!globalObject.geo) globalObject.geo = new action.data.maps.Geocoder()
			var state = store.getState()

			if(state.location.lat)
				store.dispatch({
					type: 'LATLNG_SEARCH',
					data: state.location
				})

			if(state.restaurant.request)
				store.dispatch({
					type: 'GET_PLACE',
					data: state.restaurant.request
				})				

		}

	}

	if(types[action.type]) types[action.type]()
	else next(action)

}