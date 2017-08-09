export default ( state = {}, action ) => {

	var types = {

		MARKERS(){
			return state
		}

	}

	if(types[action.type]) return types[action.type]()
	else return state

}