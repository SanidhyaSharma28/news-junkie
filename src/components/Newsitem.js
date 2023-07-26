import React from 'react'
import { Link } from 'react-router-dom';
const Newsitem=(props)=> {
        return (
            <div className='my-3'>
                <div className="card">
                    <div  style={{justifyContent:'flex-end',right:'0',position:'absolute',display:'flex'}}>
                    <span className="badge rounded-pill bg-danger" >
                        {props.source}
                    </span>
                    </div>
                    <img src={!props.imgUrl ? "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" : props.imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body" style={{color:props.mode==='dark'?'white':'black',backgroundColor:props.mode==='dark'?'#393737':'white'}}>
                        <h5 className="card-title">{props.title}</h5>

                        <p className="card-text">{props.description}...</p>
                        <p className="card-text"><small className='="text-muted>'>By {props.author ? props.author : "unknown source"} on {new Date(props.date).toGMTString()}</small></p>
                        <Link to={props.newsUrl} target='_blank' className={`btn btn-sm btn-${props.mode==='dark'?'primary':'dark'}`}>Read More</Link>
                    </div>
                </div>
            </div>
        )
    
}

export default Newsitem
