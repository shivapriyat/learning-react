import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser"

const ArticlePage = () => {
    let params = useParams();
    let articleId = params.articleId;

    let [articleInfo,setArticleInfo]=useState({upvotes:0,comments:[]});
    const {user, isLoading} = useUser();
    const navigate = useNavigate();
    useEffect(()=> {
        const loadArticleInfo = async() => {
            const response =await axios.get(`/api/v2/articles/${articleId}`);
            let newArticleInfo=response.data;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    });
    const addUpvote = async() => {
        const response = await axios.put(`/api/v2/articles/${articleId}/upvote`);
        const updatedArticleInfo = response.data;
        setArticleInfo(updatedArticleInfo);
    }
    let article = articles.find(article => article.name === articleId);


    if(!article) {
        return <NotFoundPage />
    }
    return(        
        <>
            <h1>{article.title}</h1>
            <div id="upvotes-section">
                {user ? <button onClick={addUpvote}>Upvote</button> : <button><Link to="/login">Login to upvote</Link></button>}
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>

            {article.content.map((para, i) => {
                return (<p key={i}>{para}</p>)
            })}
            { user ? 
            <AddCommentForm articleId={articleId} onNewCommentAdded={updatedArticleInfo => setArticleInfo(updatedArticleInfo)}/> : <button><Link to="/login">Login to upvote</Link></button> }
            <CommentsList comments={articleInfo.comments} />
        </>
    )
}
export default ArticlePage;