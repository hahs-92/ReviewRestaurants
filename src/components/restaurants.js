import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import RestaurantDataService from '../services/restaurant'

export const Restaurants = (props) => {
    const initialRestaurantState = {
        id: null,
        name: '',
        address: {},
        cuisine: '',
        reviews: []
    }

    const [ restaurant, setRestaurant ] = useState(initialRestaurantState)

    const getRestaurant = id => {
        RestaurantDataService.get(id)
            .then(response => {
                setRestaurant(response.data)
            })
            .catch(e => console.error(e))
    }

    useEffect(() => {
        getRestaurant(props.match.params.id)
        // console.log("userId: ", props.user.id )
    }, [props.match.params.id])

    const deleteReview = (reviewId, index) => {
        RestaurantDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                setRestaurant((prevState) => {
                    prevState.reviews.splice(index, 1) //INDEX ES EL ITEMPOSITION A ELIMINAR, Y EL 1 LA CANTIDAD 
                    return({
                        ...prevState
                    })
                })
            })
            .catch(e => console.error(e))
    }    
    return(
        <section>
            {
                restaurant ? (
                    <div>
                        <h5>{ restaurant.name }</h5>
                        <p>
                            <strong>Cuisine: </strong>{ restaurant.cuisine } <br/>
                            <strong>Address: </strong>{ restaurant.address.building } { restaurant.address.street }, { restaurant.address.zipcode }
                        </p>
                        <Link to={ '/restaurants/' + props.match.params.id + "/review" }>
                            Add Review
                        </Link>
                        <h4>Reviews</h4>
                        <div>
                            { restaurant.reviews.length > 0 ? (
                                restaurant.reviews.map((review, index) => {
                                    return(
                                        <div key={ index }>
                                            <div>
                                                <div>
                                                    <p>
                                                        { review.text } <br/>
                                                        <strong>User: </strong>{ review.name } <br/>
                                                        <strong>Date: </strong>{ review.date }
                                                    </p>
                                                    { props.user && props.user.id === review.user_id &&
                                                        <div>
                                                            <a onClick={ () => deleteReview(review._id, index) }>Delete</a>
                                                            <Link to={{
                                                                pathname: '/restaurants/' + props.match.params.id + '/review',
                                                                state: {
                                                                    currentReview: review
                                                                }
                                                            }}>Edit</Link>
                                                        </div>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div>
                                    <p>No reviews yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>No restaurants selected</p>
                    </div>
                )
            }
        </section>
        
    )
}