import React from 'react'
import 'bulma/css/bulma.min.css';
import { useState } from 'react';
// import { withRouter } from 'react-router';
import { Link} from 'react-router-dom';

export default function SignUpForm(props) {

    const [userInfo, setUserInfo] = useState({
        name:'', 
        password:'',
        username:'',
        quote:''
    })

    const handleChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    } 

    const handleSignUpSubmit = (event) => {
        event.preventDefault()
        props.signUp(userInfo)
    }

    console.log(userInfo)
    console.log(props.signUp)

    return (
        <section>
            <div className="field">
                <h1>Create Account</h1>
                <form onSubmit={handleSignUpSubmit}>
                <p className="control has-icons-left">
                    <input className="input" type="name" placeholder="Name" name='name' value={userInfo.name}onChange={handleChange}/>
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </p>
                <br></br>
                <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email" name='username' value={userInfo.username} onChange={handleChange}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                        </span>
                        </p>
                        <br></br>
                <p className="control has-icons-left">
                    <input className="input" type="password" placeholder="Password" name='password' value={userInfo.password} onChange={handleChange}/>
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </p>
                <br></br>
                <textarea onChange={handleChange} className="textarea" placeholder="Your optional inspirational quote!" value={userInfo.quote} type="quote" name="quote"></textarea>

                <br></br>
                <button className="button is-primary"><strong>Create Account</strong></button>
                </form>
                <br></br>
                <p>Have an account?</p><Link to='/'> Login</Link>
            </div>
        </section >
    )
}


