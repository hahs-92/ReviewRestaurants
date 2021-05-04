import { useState } from 'react'
import { Link } from 'react-router-dom'

import RestaurantDataService from '../services/restaurant'

export const AddReviews = (props) => {
    let initialReviewState = ''
    let editing = false

    if(props.location.state && props.location.state.currentReview) {
        editing = true
        initialReviewState = props.location.state.currentReview.text
    }

    const [ review, setReview ] = useState(initialReviewState)
    const [ submitted, setSubmitted ] = useState(false)

    const handleInputChange = event => {
        setReview(event.target.value)
    }

    const saveReview = () => {
        let data = {
            text: review,
            name: props.user.name,
            user_id: props.user.id,
            restaurant_id: props.match.params.id
        }

        if(editing) {
            data.review_id = props.location.state.currentReview._id
            RestaurantDataService.updateReview(data)
                .then(response => setSubmitted(true))
                .catch(e => console.error(e))
        } else {
            RestaurantDataService.createReview(data)
                .then(response => setSubmitted(true))
                .catch(e => console.error(e))
        }
    }
    return(
        <section>
            {
                props.user ? (
                    <div>
                        {
                            submitted ? (
                                <div>
                                    <h4>You submitted successfully¡</h4>
                                    <Link to={ '/restaurants/' + props.match.params.id}>
                                        Back to Restaurant
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        <label htmlFor="description">{ editing ? 'Edit' : 'Create' } Review</label>
                                        <input 
                                            type="text" 
                                            id='text' 
                                            required 
                                            value={ review } 
                                            onChange={ handleInputChange }
                                            name='text'
                                            />
                                    </div>
                                    <button onClick={ saveReview }>
                                        Submit
                                    </button>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        <h1>Please Login</h1>
                    </div>
                )
            }
        </section>
    )
}