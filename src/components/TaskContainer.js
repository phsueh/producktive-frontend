import React from 'react'
import Tasks from './Tasks'

export default function TaskContainer(props) {

    console.log(props)

    // const renderTasks = props.tasks.map((task) => (
    //     <Tasks key={task.id} name={task.name} priority={task.priority} difficulty={task.difficulty} start_date={task.start_date} end_date={task.end_date} complete={task.complete}/>
    // ))

    return (
        <div>
        {/* // <table className="table">
        //     <thead>
        //         <tr>
        //             <th>Name</th>
        //             <th>Difficulty</th>
        //             <th>Priority</th>
        //             <th>End Date</th>
        //             <th>Complete</th>
        //         </tr>
        //     </thead>
        //     <tbody> */}
                    <Tasks taskInfo={props} updateTask={props.updateTask} token={props.token}/>
            {/* </tbody>
        </table> */}
        </div>
    )
}
