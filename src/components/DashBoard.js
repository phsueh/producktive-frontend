import React from 'react'
import NewCategoryForm from './NewCategoryForm'
import NewGoalForm from './NewGoalForm'
// import { useState } from 'react'
import { Link } from 'react-router-dom';
import GoalContainer from './GoalsContainer';
import CategoryContainer from './CategoryContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewTaskForm from './NewTaskForm';
import { Doughnut, Pie } from 'react-chartjs-2'
import { useState } from 'react';
import TaskContainer from './TaskContainer';


export default function DashBoard(props) {

    console.log(props)

    const renderCategoryDuration = props.userInfo.categories.map((category) => {
        return category.duration})

    const renderIncompletedTasks = props.userInfo.tasks.filter((task, index) => (
        task.status_complete === false
    ))

    const renderCompletedTasks = props.userInfo.tasks.filter((task, index) => (
        task.status_complete === true
    ))

    const renderGoalCategories = props.userInfo.categories.map((category) => {
        return <GoalContainer deleteGoal={props.deleteGoal} key={category.id} id={category.id} categoryName={category.name} goalArr={category.goals} token={props.userInfo.token}/>
    })

    const renderGoalNames = props.userInfo.categories.map((category) => {
        return category.name})
    
    const renderWorstTasks = props.userInfo.tasks.filter((task, index) => (
        task.difficulty === "Worst"))

    const renderNotBadTasks = props.userInfo.tasks.filter((task, index) => (
        task.difficulty === "Not Bad"))

    const renderEasyTasks = props.userInfo.tasks.filter((task, index) => (
        task.difficulty === "Easy"))

    const pieData = {
        labels: renderGoalNames,
        datasets: [{
          label: 'Categories',
          data: renderCategoryDuration,
          backgroundColor: [
            'rgb(2, 71, 181)',
            'rgb(193, 253, 111)',
            'rgb(172, 127, 203)',
            'rgb(203, 53, 175)',
            'rgb(226, 45, 44)',
            'rgb(102, 181, 19)',
            'rgb(92, 165, 221)',
            'rgb(250, 40, 162)',
            'rgb(250, 252, 120)',
            'rgb(67, 59, 246)' 
          ],
          hoverOffset: 4
        }]
      };

    const doughnutData = {
        labels: [
            'Incomplete',
            'Complete',
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [renderIncompletedTasks.length, renderCompletedTasks.length],
            backgroundColor: [
            'rgb(226, 45, 44)',
            'rgb(102, 181, 19)'
            ],
            hoverOffset: 4
          }]
    }

    const difficultDoughnutData = {
        labels: [
            'Worst',
            'Not Bad',
            'Easy'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [renderWorstTasks.length, renderNotBadTasks.length, renderEasyTasks.length],
            backgroundColor: [
                'rgb(250, 40, 162)',
                'rgb(250, 252, 120)',
                'rgb(193, 253, 111)'
            ],
            hoverOffset: 4
          }]

    }

   
    return (

        // </section>
       <div className="container">
           <div className="hero is-fullheight has-background-white">
        <nav class="navbar" role="navigation" aria-label="main navigation">
        {/* <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div> */}

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
        <br></br>

        

        
           <div className="content">
               
               <h1>Hello, {props.userInfo.name}</h1>
               <div className="block"><h4>"{props.userInfo.quote}"</h4></div>
                    <section class="section">
                    <div class="container">
                        <div class="columns">
                            <div class="column">
                            <h3>How you spend your time daily </h3>
                                <Pie data={pieData}/>
                            </div>
                            <div className="column"> 
                            <CategoryContainer categories={props.userInfo.categories} userInfo={props.userInfo} deleteCategory={props.deleteCategory}/>
                            <h3>Create a Category</h3>
                            <NewCategoryForm userInfo={props.userInfo} addCategory={props.addCategory}/>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <hr style={{height: 5}}></hr>
                    <br></br>
                    <div className="container">
                        <div className="columns">
                            <div class="column">
                            <h3>Remaining Tasks for the day</h3>
                            <Doughnut data={doughnutData}/>
                            </div>
                     
                            <div className="column">
                            <h3>Task Overview</h3>
                            <br></br>
                            <TaskContainer tasks={props.userInfo.tasks} updateTask={props.updateTask} token={props.userInfo.token}/>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>

                    <hr style={{height: 5}}></hr>
                    <br></br>
                    <div className="container">
                        
                        <div className="columns">
                            <div class="column">
                            <h3>Difficulty</h3>
                            <Doughnut data={difficultDoughnutData}/>
                            </div>

                            <div className="column">
                            <h3>Create a Task</h3>
                            <br></br>
                                <NewTaskForm categories={props.userInfo.categories} addTask={props.addTask} userInfo={props.userInfo}/>

                            </div>
                           
                        </div>
                    </div>
                    <br></br>
                    <br></br>

                    <hr style={{height: 5}}></hr>
                    <br></br>

                    <div className="container">
                        
                        <div className="columns">
                            <div className="column">
                            <h3>Create a Goal</h3>
                            <br></br>
                            <NewGoalForm userInfo={props.userInfo} addGoal={props.addGoal}/>

                            </div>
                            <div className="column">
                            <h3>Goals Overview</h3>
                            <br></br>
               
                            {renderGoalCategories}

                            </div>
                        </div>
                    </div>
                </section>
               
            
                {/* {props.userInfo.categories.map((category, index) => (<p key={index}>{category.name} Duration {category.duration}</p>))} */}
        
            
           </div>
           
           

        <section className="hero-body">
       


        </section>

        {/* footer */}

        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                <strong>ProDuckTiv</strong> by Paul Hsueh. Built with React and Rails. Styled with Bulma and Material-UI. 
                </p>
            </div>
        </footer>
        </div>
        </div>
    )
}


/* CSV */
// 00D1B2,02CBB4,04C4B7,05BEB9,07B7BB,09B1BD,0BAAC0,0DA4C2,0E9DC4,1097C7,1290C9,148ACB,1583CD,177DD0,1976D2

/* Array */
// ["00D1B2","02CBB4","04C4B7","05BEB9","07B7BB","09B1BD","0BAAC0","0DA4C2","0E9DC4","1097C7","1290C9","148ACB","1583CD","177DD0","1976D2"]

