import { NavMenu } from './NavMenu';
import { useState, useEffect } from 'react';
export function Graphql() {

    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    function Lift(props) {

        return (
            <>
                <h1>{props.props.name}</h1>
                <p>{props.props.elevationGain}-{props.props.status}</p>
                
            </>
        );
    }
    
    useEffect(() => {
        setLoading(true);
        const query = `query {
            allLifts {
              name
              elevationGain
              status
            }
          }`;
        const opts={
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({query})
        }
        fetch(`https://snowtooth.moonhighway.com/`,opts)
            .then(response => { console.log(response); if (response.ok) { return response.json() } else { throw new Error(response.status) } })
            .then(res => setData(res))
            .then(setLoading(false))
            .catch(err => { console.log("myerrr" + err); setError(err); setLoading(false) })
    }, []);

    if (loading) {
        return (
            <>
               
                <h1> Fetch in Progress...</h1>
            </>
        );
    }
    if (error) {
        return (
            <>
               
                <pre> {JSON.stringify(error, null, 4)}</pre>
            </>
        );
    }
    if (data) {

        return (
            <>
                
               {data.data.allLifts.map(lift => <Lift props={lift} />)} 
            </>
        );
    }
    return (
        <>
           
            <div>
                <h1>Graph us</h1>
            </div>
        </>
    );
}