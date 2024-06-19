import React from "react";
import "./Joke.css"

const Joke = ({votes, vote, text, id}) => {
    function upVote(e) {vote(id, +1); }
    function downVote(e) {vote(id, -1)}

    return (
        <div className="Joke">
            <div classname="Joke-votearea">
                <button onClick={upVote}>
                    <i className="fas fa-thumbs-up" />
                </button>

                <button onClick={downVote}>
                    <i className="fas fa-thumb-down" />
                </button>

                {votes}
            </div>
            <div className="Joke-text">{text}</div>
        </div>
    )
}

export default Joke;