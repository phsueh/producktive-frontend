import React from 'react'
import { useState, useEffect } from 'react'

export default function NewTaskForm(props) {

    const [taskInfo, setNewTaskInfo] = useState({
        name: '', 
        description: '', 
        priority: '', 
        difficulty: '', 
        start_date: '', 
        end_date: '',
        duration: '',
        status_complete: false,
        taskable_type: "Category",
        taskable_id: 0
    })
    // const [goals, setGoals] = useState([])

    // useEffect(() => {
    //     const foundCategory = props.categories.find((category) => (
    //         category.id === parseInt(taskInfo.category)))
    //     let potentialGoals = foundCategory ? foundCategory.goals : []
    //     setGoals(potentialGoals)
    // }, [taskInfo.category])
    
    let allGoals = props.categories.map((category) => {
        let modifiedGoals = category.goals.map((goal) => {
            return {...goal, name: `${category.name} - ${goal.name}`}
        })
        return modifiedGoals 
    }).flat()

    let arrOfOptions = taskInfo.taskable_type === "Category" ? props.categories : allGoals

    const handleChange = (e) => {
        setNewTaskInfo({
            ...taskInfo,
            [e.target.name]: e.target.value, 
        }) 
    }

    const handleChangeRadio = (e) => {
        setNewTaskInfo({
            ...taskInfo,
            [e.target.name]: e.target.value, 
            taskable_id: arrOfOptions[0] ? arrOfOptions[0].id : 0
        }) 
    }

    console.log(taskInfo)

    const handleSubmit = (e) => { 
        e.preventDefault()
        console.log(taskInfo)
        fetch("http://localhost:3000/createtask", {
            method: "POST", 
            headers: {
                "content-type": "application/json",
                "authorization": props.userInfo.token
                }, 
                body: JSON.stringify({
                    name: taskInfo.name, 
                    description: taskInfo.description, 
                    priority: taskInfo.priority, 
                    difficulty: taskInfo.difficulty, 
                    start_date: taskInfo.start_date, 
                    end_date: taskInfo.end_date,
                    duration: taskInfo.duration,
                    taskable_type: taskInfo.taskable_type, 
                    taskable_id: taskInfo.taskable_id,
                    status_complete: false
                })
            })
                .then(res => res.json())
                .then((task) => {
                    if(task.id) {
                        props.addTask(task)
                    }
                    setNewTaskInfo({
                        name: '', 
                        description: '', 
                        priority: '', 
                        difficulty: '', 
                        start_date: '', 
                        end_date: '',
                        duration: '',
                        taskable_type: 'Category',
                        taskable_id: 0,
                        status_complete: false
                    })

                })
    }

    

    return (
        <div className="field">
            <form onSubmit={handleSubmit}>
            
            <label className="radio" htmlFor="Category">Category</label>
            <input onChange={handleChangeRadio} checked={taskInfo.taskable_type === "Category"} name='taskable_type' value="Category" id="Category" type='radio'/>

            

            <label className="radio" htmlFor="Goal">Goal</label>   
            <input onChange={handleChangeRadio} checked={taskInfo.taskable_type === "Goal"} name='taskable_type' value="Goal" id="Goal" type='radio'/> <br></br>

            

                

            {/* <label htmlFor="category">Category</label> */}
                <select className="select" onChange={handleChange} value={taskInfo.taskable_id} name="taskable_id">
                    <option value={0} disabled selected>Select</option>
                    {arrOfOptions.map((taskableOption, index) => (
                        <option key={taskableOption.id} value={taskableOption.id}>{taskableOption.name}</option>
                    ))}
                </select>



                <label className="label" htmlFor="name">Name</label>
                    <input className="input" onChange={handleChange} value={taskInfo.name} id="text" type="text" name="name"/>
                <label className="label" htmlFor="description">Description</label>
                    <input className="input" onChange={handleChange} value={taskInfo.description} id="text" type="text" name="description"/>
                <label className="label" htmlFor="priority">Priority</label>
                    <select onChange={handleChange} className="select" value={taskInfo.priority} type="category" name="priority">
                        <option value="" disabled selected hidden>Select</option>
                        <option>Must</option>
                        <option>Should</option>
                        <option>Want</option>
                    </select>
                <label className="label" htmlFor="difficulty">Difficulty</label>
                    <select className="select" onChange={handleChange} value={taskInfo.difficulty} 
                    type="category" name="difficulty">
                        <option value="" disabled selected hidden>Select</option>
                        <option>Worst</option>
                        <option>Not Bad</option>
                        <option>Easy</option>
                    </select>
                <label className="label" htmlFor="start_date">Start Date</label>
                    <input className="input" onChange={handleChange} value={taskInfo.start_date} type="date" name="start_date"/>
                <label className="label" htmlFor="end_date">End Date</label>
                    <input className="input" onChange={handleChange} value={taskInfo.end_date} type="date" name="end_date"/>
                <label className="label" htmlFor="duration">Duration</label>
                    <input className="input" onChange={handleChange} value={taskInfo.duration} id="text" type="text" name="duration"/>
                
           

             



                {/* <label htmlFor="goal">Goal</label>
                    <select onChange={handleChange} value={taskInfo.goal} type="text"name="goal">
                        <option value="" disabled selected hidden>Select</option>
                        {goals.map((goals, index) => (
                            <option key={goals.id} value={goals.id}>{goals.name}</option>
                        ))}
                    </select> */}
                {/* <label htmlFor="status_complete">Complete</label>
                    <input onChange={handleChange} value={taskInfo.status_complete} type="checkbox" name="status_complete"/> */}
                    <br></br>
                    <br></br>
                <button className="button is-primary" value="submit" type="submit"><strong>Create Task</strong></button>
            </form>
        </div>
    )
}
