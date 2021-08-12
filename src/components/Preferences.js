import React from 'react'
import { Link } from 'react-router-dom';


export default function Preferences(props) {

    const renderCategories = props.userInfo.categories.map((categories, index) => {
        return <p key={categories.id}>{categories.name}, {categories.duration}</p>
    })

    const renderGoals = props.userInfo.categories.find((goals, index) => goals.goals)
    
    console.log(renderGoals)

    return (
        <div className="container">
            <div className="hero is-fullheight has-background-white">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                        <Link to='/dashboard'>Dashboard</Link>
                        </a>
                        <a class="navbar-item">
                        <Link to='/preferences'>Preferences</Link>
                        </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                        More
                        </a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item">
                                Take a Break
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider"/>
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                    </div>
                    <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                        <a class="button" onClick={props.logout}>
                            Logout
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
                <div className="content">
                    <div className="block">
                        <strong>Your Categories</strong>
                        <p>{renderCategories}</p>
                    </div>
                </div>

                <section className="hero-body">
       


                </section>
            </div>
        </div>
    )
}