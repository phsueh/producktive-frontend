import React from 'react'
import { useState } from 'react'
import { Fragment } from 'react-is'
import TaskRows from './TaskRows'

export default function Tasks(props) {

    console.log(props)

    const renderTasks = props.taskInfo.tasks.map((task) => (
        <TaskRows id={task.id} name={task.name} difficulty={task.difficulty} priority={task.priority} end_date={task.end_date} updateTask={props.updateTask} token={props.token}/>
        // <tr>
        // <td>{task.name}</td>
        // <td>{task.difficulty}</td>
        // <td>{task.priority}</td>
        // <td>{task.end_date}</td>
        // <td><input type="checkbox" name="complete" value="complete"></input></td>
        // </tr>
    ))
 
    return (
        <table className="table">
        <thead>
                <tr>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>Priority</th>
                    <th>End Date</th>
                    <th>Complete</th>
                </tr>
            </thead>


        <tbody>
            <Fragment>
            {renderTasks}
            </Fragment>
        </tbody>

        </table>
    )
}
