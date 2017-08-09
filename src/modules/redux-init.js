
import { createStore, combineReducers, applyMiddleware } from 'redux'

// reducers
import markers from './reducers/markers'
import location from './reducers/location'
import restaurant from './reducers/restaurant'

// middlewares
import { createLogger as logger } from 'redux-logger'
import locationsMiddleware from './middlewares/locations'
import mapMiddleware from './middlewares/map'
import restaurantMiddleware from './middlewares/restaurant'

var globalObject = {
	map: null,
	places: null,
	goe: null
}

var reducers = combineReducers({
	markers, location, restaurant
})

var middleWares = applyMiddleware(
	logger(),
	locationsMiddleware(globalObject),
	mapMiddleware(globalObject),
	restaurantMiddleware(globalObject)
)

var store = createStore(
	reducers 
,	middleWares
)

export default store