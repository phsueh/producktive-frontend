import React from 'react'

export default function TaskRows(props) {

    // console.log(props)

    const handleTaskComplete = (e) => {
        fetch(`http://localhost:3000/tasks/${props.id}`, {
            method: "PATCH", 
            headers: {
                "content-type": "application/json",
                "authorization" : props.token
            }, 
            body: JSON.stringify({
                status_complete: !props.status_complete
            })
        })
        .then(res=>res.json())
        .then((res) => {
            if (res.id) {
                props.updateTask(res)
            }
        })

    }

    return (
        <tr>
            <td>{props.name}</td>            
            <td>{props.difficulty}</td>
            <td>{props.priority}</td>
            <td>{props.end_date}</td>
            <td><input onChange={handleTaskComplete} type="checkbox" name="complete" value="complete"></input></td>
        </tr>
    )
}
