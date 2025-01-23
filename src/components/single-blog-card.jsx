import { useDispatch } from "react-redux";
import {selectEditBlog, deleteBlog} from '../store/slice/blogSlice';

const SingleBlogCard = ({blog}) => {
    const dispatch = useDispatch();
    return (
        <div className="blog_wrap col-6 mb-3">
            <div className="card">
                <div className="card-body">
                    <h3>{blog.title}</h3>
                    <p>{blog.body}</p>
                    <div className="blog_action_wrap">
                        <span onClick={() => dispatch(selectEditBlog(blog.id))} className="action_link text-success">Edit</span>
                        <span onClick={() => dispatch(deleteBlog(blog.id))} className="action_link text-danger">Delete</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleBlogCard;