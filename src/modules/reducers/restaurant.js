export default ( state = {place:{}, request:''}, action ) => {

	var types = {

		GET_PLACE(){
			return {
				place: {},
				request: action.data
			}
		},

		PLACE_GOTTEN(){
			return {
				...state,
				place: action.data
			}
		}

	}

	if(types[action.type]) return types[action.type]()
	else return state

}