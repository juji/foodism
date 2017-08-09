export default ( state = { data:{}, index:[] }, action ) => {

	var types = {

		INCOMING_MARKERS(){
			var newState = { ...state }
			var len = action.data.length
			for(var i=0;i<len;i++){
				if( newState.data[ action.data[i].place_id ] ) continue
				newState.data[ action.data[i].place_id ] = action.data[i]
				newState.index.push( action.data[i].place_id )
			}
			return newState
		},

		LATLNG_SEARCH(){
			return { data:{}, index:[] }
		}

	}

	if(types[action.type]) return types[action.type]()
	else return state

}