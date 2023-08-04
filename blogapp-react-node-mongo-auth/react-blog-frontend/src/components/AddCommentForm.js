import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleId,onNewCommentAdded}) => {

    const [name,setName] = useState("");
    const [commentText, setCommentText] = useState("");
    const {user} = useUser();

    const addNewComment = async()=> {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        const response = await axios.post(`/api/v2/articles/${articleId}/comments`, {
            postedBy: name, text: commentText
        }, {headers});
        const updatedArticleInfo = response.data;
        onNewCommentAdded(updatedArticleInfo);
        setName("");
        setCommentText("");
    }
    return(
        <div id="add-comment-form">
            <h3>Add Comment</h3>
            {user && <p>You are posting as {user.email}</p>}
            <textarea rows="4" cols="50"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
            />
            <button onClick={addNewComment}>Add comment</button>
        </div>
    );

}

export default AddCommentForm;