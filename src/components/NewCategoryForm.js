import React from 'react'
import { useState } from 'react'

export default function NewCategoryForm(props) {

    const [categoryInfo, setNewCategoryInfo] = useState({
        name: '', 
        duration: ''
    });

    const handleChange = (e) => {
        setNewCategoryInfo({
            ...categoryInfo,
            [e.target.name]: e.target.value
        }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/createcategory", {
            method: "POST", 
            headers: {
                "content-type": "application/json",
                "authorization": props.userInfo.token
                }, 
                body: JSON.stringify({
                    name: categoryInfo.name,
                    duration: categoryInfo.duration
                })
            })
                .then(res => res.json())
                .then((category) => {
                    if(category.id) {
                        props.addCategory(category)
                    }
                    setNewCategoryInfo({
                        name: '', 
                        duration: ''
                    })
                })
    }

    return (
        <div className="field">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input className="input" type="text" id="name" name="name" value={categoryInfo.name} onChange={handleChange}/>
            <br></br>
            <label htmlFor="Duration">Duration</label>
            <input className="input" type="text" id="duration" name="duration" value={categoryInfo.duration} onChange={handleChange}/>
            <br></br>
            <br></br>
            <button className="button is-primary" type="submit" value="create"><strong>Create Category</strong></button>
        </form>
        </div>
    );
}
