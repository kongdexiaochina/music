import React from 'react'
import {NavLink} from 'react-router-dom'
import RemoSongItem from '../../component/content/RemoSongItem'
const BoutiqueSong = props => {
    const {recommend} = props
    return (
        <section className="song_recommend">
            {
                recommend.map((item, index) => (
                    <NavLink to={`/recommend?id=${item.id}&name=${item.name}`} key={index}>
                        <RemoSongItem item={item} color={"#fff"}/>
                    </NavLink>
                ))
            }
        </section>
    )
}

export default BoutiqueSong
