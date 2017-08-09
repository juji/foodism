

export default globalObject => store => next => action => {

	var types = {

		GET_PLACE(){

			next(action)
			if(!globalObject.place) {
				console.log('map not exists')
				return
			}
			
			globalObject.place.getDetails({
				placeId: action.data
			},(place,status)=>{
				if(status !== 'OK'){
					store.dispatch({
						type:'ERROR',
						data:'Error while retrieving restaurant, please try again later..'
					})
					return
				}
				
				store.dispatch({
					type: 'PLACE_GOTTEN',
					data: place
				})
				
			})

		}

	}

	if(types[action.type]) types[action.type]()
	else next(action)

}