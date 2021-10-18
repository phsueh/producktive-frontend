// import logo from './logo.svg';
// import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LogInForm from './components/LogInForm'
import SignUpForm from './components/SignUpForm';
import DashBoard from './components/DashBoard'; 
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Preferences from './components/Preferences';
import EditCategoryForm from "./components/EditCategoryForm"
// import { responsiveFontSizes } from '@material-ui/core';

library.add(fas)

function App(props) {

  const [userInfo, setUserInfo] = useState({
    id: 0, 
    name: '',
    username: '',
    quote:'',
    token: "", 
    categories: [],
    tasks: [], 
  })

  const [date, setDate] = useState({
    currentDate: new Date().toLocaleDateString(),
  })

  useEffect(() => {
    if(localStorage.token)
      fetch("http://localhost:3000/me", {
        headers: {
          "authorization" : localStorage.token
        }
      })
      .then(res => res.json())
      .then(handleResponse)
  },[]);

  // const [categories, setCategories] = useState([]
  // )

  const handleSignUp = (userInfo) => {

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: userInfo.name,
        username: userInfo.username,
        password: userInfo.password, 
        quote: userInfo.quote
      })
    })
      .then(res => res.json())
      .then(handleResponse)
  }

  const handleResponse = (resp) => {
    if(resp.token){
      setUserInfo({
        ...userInfo,
        username: resp.user.username,
        name: resp.user.name,
        quote: resp.user.quote,
        token: resp.token,
        categories: resp.user.categories,
        tasks: resp.user.tasks
      })
      localStorage.token = resp.token
      props.history.push("/dashboard")
    } else {
      alert("Request error")
    }
  }

  const handleLogin = (userInfo) => {

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers :{
        "content-type": "application/json"
      }, 
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
      .then(res => res.json())
      .then(handleResponse)
  }

  const addCategory = (category) => {
    setUserInfo({
      ...userInfo,
      categories: [...userInfo.categories, category]
    })
  }

  const addGoal = (goal) => {
    let findCategoryForGoal = userInfo.categories.find(category => {
      return category.id === goal.category_id
    })

    let newArrOfGoals = [...findCategoryForGoal.goals, goal]

    let copyOfCategory = {
      ...findCategoryForGoal, 
      goals: newArrOfGoals
    }

    replaceCategoryInState(copyOfCategory)
  }

  const addTask = (task) => {

    setUserInfo({
      ...userInfo, 
      tasks: [...userInfo.tasks, task]
    })
  }

  const handleTaskComplete = (task) => {
  
    setUserInfo({
      ...userInfo,
      tasks: [...userInfo.tasks, task]
    })
  }

  const deleteGoal = (goal) => {
    
    let findCategoryForGoal = userInfo.categories.find(category => {
      return category.id === goal.category_id
    })
    
    let newArrOfGoals = findCategoryForGoal.goals.filter(goalsObj => {
      return goalsObj.id !== goal.id
    })

    let copyOfGoals = {
      ...findCategoryForGoal, 
      goals: newArrOfGoals
    }

    replaceCategoryInState(copyOfGoals)

  }

  const replaceCategoryInState = (copyOfCategory) => {
    let copyOfAllCategories = userInfo.categories.map(category => {
      if(category.id === copyOfCategory.id) {
        return copyOfCategory
      } else {
        return category
      }
    })

    setUserInfo({
      ...userInfo,
      categories: copyOfAllCategories
    })
  }

  const handleLogout = () => {
    console.log("logging out")
    setUserInfo({
      id: 0, 
      name: '',
      username: '',
      quote:'',
      token: "", 
      categories: [],
    })
    localStorage.clear()
    props.history.push("/")
  }

  const deleteCategory = (deletedCategory) => {
    const newCategoryArr = userInfo.categories.filter(category => category.id !== deletedCategory.id)
    setUserInfo({
      ...userInfo, 
      categories: newCategoryArr
    })
  }

  return (
    <div className="container">
      {/* Navigation bar */}

      <Switch>
        <Route exact path="/">
          <section className="hero is-fullheight has-background-white">
            <div className="hero-body">
              <div className="container">
                <div className="level-item has-text-centered">
                <LogInForm login={handleLogin}/>
                </div>
              </div>
            </div>
          </section>
        </Route>

        <Route exact path="/signup">
        <section className="hero is-fullheight has-background-white">
            <div className="hero-body">
              <div className="container">
                <div className="level-item has-text-centered">
                  <SignUpForm signUp={handleSignUp}></SignUpForm>
                </div>
              </div>
            </div>
          </section>
        </Route>

        <Route exact path="/dashboard">
            <DashBoard userInfo={userInfo} addCategory={addCategory} addGoal={addGoal} addTask={addTask} logout={handleLogout} deleteCategory={deleteCategory} deleteGoal={deleteGoal} date={date} updateTask={handleTaskComplete}></DashBoard>
        </Route>
        <Route exact path="/preferences">
          <Preferences userInfo={userInfo} >
          </Preferences>
        </Route>
        <Route exact path="/editcategory">
              <EditCategoryForm userInfo={userInfo}/>
        </Route>
      </Switch>
      </div>
  );
}

export default withRouter(App)
