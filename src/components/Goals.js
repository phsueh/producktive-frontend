import React from 'react'

export default function Goals(props) {

    const handleDelete = (e) => {
        fetch(`http://localhost:3000/goals/${props.id}`, {
            method: "DELETE", 
            headers: {
                "authorization" : props.token
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.id) {
                    props.deleteGoal(res)
                }
            })

    }

    return (
        <>
                 {/* <tr>
                     <td>Goal</td>
                     <td>Start Date</td>
                     <td>End Date</td>
                 </tr> */}
                <tr>
                <td>{props.name}</td>
                <td>{props.start_date}</td>
                <td>{props.end_date}</td>
                {/* <td><button>Edit</button></td> */}
                <td><a onClick={handleDelete}>Delete</a></td>
                </tr>
       </>
    )
}
