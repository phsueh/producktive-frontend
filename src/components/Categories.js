import React from 'react'
import { Link } from 'react-router-dom'

export default function Categories(props) {

    

    const handleDelete = (e) => {

        fetch(`http://localhost:3000/categories/${props.id}`, {
            method: "DELETE",
            headers: {
                "authorization" : props.userInfo.token
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.id) {
                    props.deleteCategory(res)
                }
            }) 
        }


    return (
        // <table className="table">
        // <thead>
        //         <tr>
        //             <th>Category</th>
        //             <th>Hours</th>
        //             <th>Edit</th>
        //             <th>Delete</th>
        //         </tr>
        //     </thead>
        //     <tbody>
                <>
                <tr> 
                    <td>{props.name}</td>
                    <td>{props.duration} Hours</td>
                    {/* <td><Link to='/editcategory'><button>Edit</button></Link></td> */}
                    <td><a onClick={handleDelete}>Delete</a></td>
                </tr>
                </>
        //     </tbody>                
        // </table>
    )
}