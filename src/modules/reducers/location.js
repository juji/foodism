export default ( state = { lat:0, lng:0, name:'' }, action ) => {

	var types = {

		LOCATION(){
			return {
				...state,
				lat: action.data.coords.latitude,
				lng: action.data.coords.longitude
			}
		},
		
		LOCATION_NAME(){
			return {
				...state,
				name: action.data
			}	
		}

	}

	if(types[action.type]) return types[action.type]()
	else return state

}