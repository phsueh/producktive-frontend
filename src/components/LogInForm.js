// import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import { useState } from 'react';
import { withRouter } from 'react-router';
import { Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    }
})

function LoginForm(props) {

    const classes = useStyles();

    const [loginInfo, setLoginInfo] = useState({
        username:'',
        password:''
    })

    const handleChange = (event) => {
        setLoginInfo({
            ...loginInfo,
            [event.target.name]: event.target.value
        })
    } 

    const handleSubmit = (event) => {
        event.preventDefault()
        props.login(loginInfo)
    }

    return (

        <section class="section">
			<div class="container">
				<div class="columns">
					<div class="column">
                        <img src="./logo.gif"/>
					</div>
					<div class="column">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    <Card className={classes.root}> 
                        <CardContent>
                        <br></br>
                        <strong>"Quack quack, let's be productive"</strong>
                        <br></br>
                        <br></br> 
                        <form onSubmit={handleSubmit}>
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" name='username' value={loginInfo.username} onChange={handleChange}/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                                </p>
                                <br></br>
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password" name='password' value={loginInfo.password}onChange={handleChange}/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                            <br></br>
                            <button className="button is-primary"><strong>Log In</strong></button>
                        </form>
                        <br></br>
                        <Link to='/signup'>Create an account</Link> 
                        </CardContent>
                        </Card>
					</div>
				</div>
			</div>
		</section>

  
    )
}

export default withRouter(LoginForm)