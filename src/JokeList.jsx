import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css"

const JokeList = ({numJokesToGet = 5}) => {
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [numJokesToGet, setNumJokesToGet] = useState(5);

    useEffect(() => {
        async function getJokes() {
        
        let j = [...jokes];
        let seenJokes = new Set();

        try {
            while (j.length < numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });
                let {...jObj} = res.data;

                if(!seenJokes.has(jObj.id)) {
                    seenJokes.add(jObj.id);
                    j.push({...jObj, votes: 0});
                } else {
                    console.log("duplicate found!")
                }
            }
            setJokes(j);
            setIsLoading(false)
        } catch(err){
            console.error(err);
        }
    }

    if(jokes.length === 0) getJokes();
}, [jokes, numJokesToGet]);
    


    function generateNewJokes() {

        setJokes([]);
        setIsLoading(true);
    }

    function vote(id, delta) {
        setJokes( allJokes => allJokes.map(j => (j.id === id ? {...j, votes: j.votes + delta } : j)
        ))

    }
    
    if(isLoading) {
        return (
            <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>  
        )
    }

    let sortedJokes = [...jokes].sort((a,b) => b.votes - a.votes);

    return (
        <div className="JokeList">
            <button className="Jokelist-getmore"
            onClick={generateNewJokes()}>
                Get New Jokes
            </button>

            {sortedJokes.map(({joke, id, votes})=> (
                <Joke 
                    text={joke}
                    key={id}
                    votes={votes}
                    vote={vote}
                    />
            ))}
        </div>


    )
}

export default JokeList;