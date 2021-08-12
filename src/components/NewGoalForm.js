import React from 'react'
import { useState } from 'react'

export default function NewGoalForm(props) {

    const [goalInfo, setNewGoalInfo] = useState({
        name: '', 
        start_date: '',
        end_date: '', 
        category: ''
    })

    const handleChange = (e) => {
        setNewGoalInfo({
            ...goalInfo,
            [e.target.name]: e.target.value
        }) 
    }

    // console.log(goalInfo)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/creategoal", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": props.userInfo.token
            },
            body: JSON.stringify({
                name: goalInfo.name,
                start_date: goalInfo.start_date,
                end_date: goalInfo.end_date,
                category_id: goalInfo.category
                })
            })
            .then(res => res.json())
            .then((goal) => {
                props.addGoal(goal)
                setNewGoalInfo({
                    name: '', 
                    start_date: '',
                    end_date: '', 
                    category: ''
                })
        })
    }

    // console.log(props.userInfo.categories)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="label"htmlFor="category">Category</label>
                <select className="select" type="category" id="category" name="category" value={goalInfo.category} onChange={handleChange}>
                    <option value="" disabled selected hidden>Select</option>
                    {props.userInfo.categories.map((category, index) => (<option key={category.id} value={category.id}>{category.name}</option>))}
                </select>
                <label className="label"htmlFor="name">Name</label>
                <input className="input" type="text" id="name" name="name" value={goalInfo.name} onChange={handleChange}/>
                <label className="label"htmlFor="start_date">Start Date</label>
                <input className="input" type="date" id="start_date" name="start_date" value={goalInfo.start_date} onChange={handleChange}/>
                <label className="label"htmlFor="end_date">End Date</label>
                <input className="input" type="date" id="end_date" name="end_date" value={goalInfo.end_date} onChange={handleChange}/>
                <br></br>
                <br></br>
                <button className="button is-primary" type="submit" value="Create"><strong>Create Goal</strong></button>
            </form>
        </div>
    )
}
