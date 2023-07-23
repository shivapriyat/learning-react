import axios from "axios";
import { useState } from "react";

const AddCommentForm = ({articleId,onNewCommentAdded}) => {

    const [name,setName] = useState("");
    const [commentText, setCommentText] = useState("");
    const addNewComment = async()=> {
        const response = await axios.post(`/api/v2/articles/${articleId}/comments`, {
            postedBy: name, text: commentText
        });
        const updatedArticleInfo = response.data;
        onNewCommentAdded(updatedArticleInfo);
        setName("");
        setCommentText("");
    }
    return(
        <div id="add-comment-form">
            <h3>Add Comment</h3>
            <label>
                Name:
                <input value={name}
                onChange={e => setName(e.target.value)}
                type="text"/>
            </label>
            <label>
                Commment:
                <textarea rows="4" cols="50"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                />
            </label>
            <button onClick={addNewComment}>Add comment</button>
        </div>
    );

}

export default AddCommentForm;