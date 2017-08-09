import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Spinner, Intent } from '@blueprintjs/core'
import './RestaurantView.css'

class PlaceReview extends Component {
	render(){
		var review = this.props.review
		return (
			<div className="cf review-container">
				<img src={review.profile_photo_url} alt={review.author_name} />
				<div className="review-content">
					<p className="review-author">{review.author_name}</p>
					<p className="review-info">
						<span className="review-time">{review.relative_time_description}</span> &nbsp;|&nbsp;&nbsp;
						<span className="review-rating">rating: {review.rating}</span>
					</p>
					<p className="review-text">{review.text}</p>
				</div>
			</div>
		)
	}
}


class RestaurantView extends Component {

	componentWillMount(){
		this.props.dispatch({
			type: 'GET_PLACE',
			data: this.props.match.params.place
		})
	}

	renderPlace(){
		var place = this.props.place,
			imagePlaceholder = 'http://www.freeiconspng.com/uploads/chain-eating-fast-food-restaurant-icon--26.png',
			rating = place.rating ? place.rating / 5 : 0,
			ratingColor, reviews = [];

		if(place.rating<=2) ratingColor = Intent.NONE
		else if(place.rating<=3) ratingColor = Intent.WARNING
		else if(place.rating<=4) ratingColor = Intent.PRIMARY
		else ratingColor = Intent.SUCCESS

		if(!place.reviews) place.reviews = []

		for(var i=0;i<place.reviews.length;i++)
			reviews.push(<PlaceReview key={i} review={place.reviews[i]} />)

		return(
			<div className="pt-dialog restaurant-view">
				<div className="pt-dialog-header">
					<span className="pt-icon-large pt-icon-shop"></span>
					<h5>Restaurant</h5>
					<Link className="restaurant-view-close" to="/"><span className="pt-dialog-close-button pt-icon pt-icon-small-cross"></span></Link>
				</div>
				<div className="pt-dialog-body pt-running-text">
					<div className="cf">
						<div className="f-left restaurant-image"><img src={place.photos && place.photos.length ? place.photos[0].getUrl({maxWidth:500,maxHeight:500}) : imagePlaceholder} alt={place.name} /></div>
						<div className="restaurant-header">
							<p><big><b>{place.name}</b></big></p>
							<p className="restaurant-address">{place.formatted_address}</p>
							<a href={"tel:"+place.international_phone_number}>{place.international_phone_number}</a><br /><br />
							{place.opening_hours && place.opening_hours.open_now ? <span className="pt-tag pt-intent-success">Open</span> : <span className="pt-tag">Closed</span> }
						</div>
					</div>
					<div className="cf">
						<div className="f-right restaurant-rating">
							<h5 className="restaurant-rating-header">Rating</h5>
							<Spinner 
								intent={ ratingColor }
								className="rating-spinner pt-large" 
								value={rating}
							/>
							<div className="rating-number">{place.rating}</div>
							<a role="button" target="_blank" className="write-review pt-button pt-intent-danger" href={"https://search.google.com/local/writereview?placeid="+place.place_id} tabindex="0">Write Review</a>
						</div>
						<div className="f-left restaurant-review">
							<h5 className="restaurant-review-header">Top 5 Reviews</h5>
							{ reviews.length ? reviews : <small>no reviews</small> }
							{ reviews.length ? <div style={{textAlign:'center'}}>
								<a style={{display:'block'}} role="button" target="_blank" className="pt-large write-review pt-button pt-intent-danger" href={"https://search.google.com/local/writereview?placeid="+place.place_id} tabindex="0">Write Review</a>
							</div> : null
							}
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderPlaceholder(){
		return(
			<div className="pt-dialog restaurant-view">
				<div className="pt-dialog-header">
					<span className="pt-icon-large pt-icon-shop"></span>
					<h5>Loading Restaurant...</h5>
					<Link className="restaurant-view-close" to="/"><span className="pt-dialog-close-button pt-icon-small-cross"></span></Link>
				</div>
				<div className="pt-dialog-body" style={{textAlign:'center'}}>
					<Spinner />
				</div>
			</div>
		)
	}

	render(){
		return this.props.place.id ? this.renderPlace() : this.renderPlaceholder()
	}

}

export default connect(state => ({place: state.restaurant.place}))(RestaurantView)