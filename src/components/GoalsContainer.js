import React from 'react'
import Goals from './Goals'

export default function GoalContainer(props) {

    const renderGoals = props.goalArr.map((goals, index) => {
        return <Goals id={goals.id} deleteGoal={props.deleteGoal} key={goals.id} name={goals.name} start_date={goals.start_date} end_date={goals.end_date} token={props.token} />
    })

    const renderRows = props.goalArr.map((goals) => (
        <tbody>
            <td>{goals.name}</td>
            <td>Start {goals.start_date}</td>
            <td>End {goals.end_date}</td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
        </tbody>

    ))

    return (
        <div>
            <br></br>
            
            <strong>{props.categoryName} Goals</strong>
            <table className="table">
                {/* <tr>
                    <td>Goal</td>
                 </tr> */}
                 <tr>
                 <td>{renderGoals}</td>
                 </tr>
            </table>
            
        </div>
    )
}
