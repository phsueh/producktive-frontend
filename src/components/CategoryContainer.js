import React from 'react'
import Categories from './Categories'
import { Link } from 'react-router-dom'

export default function CategoryContainer(props) {



    let arrCategories = props.categories.map((categories) => {
        return <Categories key={categories.id} id={categories.id} name={categories.name} duration={categories.duration} userInfo={props.userInfo} deleteCategory={props.deleteCategory}/>
    })


    return (
        <table className='table'>
            <thead>
                <tr>
                    <h2>Categories</h2>
                </tr>
            </thead>
            <tr>
            {arrCategories}
            </tr>
        </table>
    )
}
