import { useState } from 'react'

//ESTILOS
import styles from '../styles/components/login.module.css'


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
        <section className={ styles.Login }>

            <div className={ styles.Wrapper }>

                <div className={ styles.Labels }>
                <label htmlFor="user">Username</label>
                    <input 
                        type="text"
                        id='name'
                        required
                        value={ user.name }
                        onChange={ handleInputChange }
                        name='name'
                    />
            
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

                <div className= { styles.ButtonWrapper }>
                    <button onClick={ login }>
                        Login
                    </button>
                </div>
            </div>

        </section>
    )
}