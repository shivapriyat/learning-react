import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";
import { useParams } from "react-router-dom";
const ArticlePage = () => {
    let params = useParams();
    let articleId = params.articleId;
    let article = articles.find(article => article.name === articleId);
    if(!article) {
        return <NotFoundPage />
    }
    return(        
        <>
        <h1>{article.title}</h1>
        {article.content.map((para,i) => {
            return (<p key={i}>{para}</p>)
        })}
        </>
    )
}
export default ArticlePage;