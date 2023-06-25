import {NavMenu} from './NavMenu';
import { useState, useEffect } from 'react';
export function Restapi() {

    function GithubUser(props) {
        
        return(
            <>
            <h1>{props.props.name}</h1>
            <p>{props.props.location}</p>
            <img src={props.props.avatar_url} height={150} alt={props.props.name}/>
            </>
        );
    }
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=> {
        setLoading(true);
        fetch(`https://api.github.com/users/moonhighway`)
        .then(response => { console.log(response); if(response.ok) { return response.json()} else {throw new Error(response.status)} })
        .then(res => setData(res))
        .then(setLoading(false))
        .catch(err=> {console.log ("myerrr"+ err); setError(err); setLoading(false)})
    },[]);

    if(loading) {
        return(
            <>
           
           <h1> Fetch in Progress...</h1>
            </>
        );
    }
    if(error) {
        return(
            <>
           
           <pre> {JSON.stringify(error,null,4)}</pre>
            </>
        );
    }
    if(data) {
        // return(
        //     <>
        
        //    <pre> {JSON.stringify(data,null,4)}</pre>
        //     </>
        // );
        return(
            <>
          
            <GithubUser props={data} />
            </>
        );
    }
    return(
        <>
       
        <div>
            <h1>REST us</h1>
        </div>
        </>
    );
}