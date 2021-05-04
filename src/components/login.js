import { useState } from 'react'

export const Login = (props) => {
    const initialUserState = {
        name: '',
        id: ''
    }

    const [ user, setUser ] = useState(initialUserState)

    const handleInputChange = e => {
        const { name, value } = e.target
        console.log("NAME: ", name)
        console.log("VALUE: ", value)
        setUser({ ...user, [name]: value })
    }

    const login =() => {
        props.login(user)
        props.history.push('/')
    }
    return(
        <section>
            <div>
                <label htmlFor="user">Username</label>
                <input 
                    type="text"
                    id='name'
                    required
                    value={ user.name }
                    onChange={ handleInputChange }
                    name='name'
                />
            </div>

            <div>
                <label htmlFor="id">ID</label>
                <input
                    type="text"
                    id='id'
                    required
                    value={ user.id }
                    onChange={ handleInputChange }
                    name='id'
                />
            </div>

            <button onClick={ login }>
                Login
            </button>
        </section>
    )
}