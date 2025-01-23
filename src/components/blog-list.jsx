import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogList, blogErrorHandle, startLoading } from "../store/slice/blogSlice";
import SingleBlogCard from "./single-blog-card";

const BlogList = () => {
    const { isLoading, blogs, error } = useSelector((store) => store.blogs);
    const dispatch = useDispatch();
    const updatedBlogs = [...blogs].sort((a,b) => b.id-a.id);
    useEffect(() => {
        (
            async function(){
                dispatch(startLoading());
                try{
                    const response = await fetch('https://dummyjson.com/posts');
                    const result = await response.json();
                    setTimeout(function(){    
                        dispatch(fetchBlogList(result.posts))
                    }, 500)
                }catch(err){
                    console.log("Error : ", err)
                    dispatch(blogErrorHandle({type: 'error', payload:{"message":"Something went wrong!"}}));
                }finally{
                    console.log("After Api call!");
                }            
            }
        )();    
        
    }, []);
    // console.log("isLoading in comp : ", )
    if(isLoading) return (<h2>Loading...</h2>)
    if(error != "") return (<h4>{error}</h4>)
    return (
        <div className="blogs_list_content">
            <h4>Blog List</h4>
            <div className="blogs_list_wrap row">
                {blogs?.length > 0 ?
                    updatedBlogs.map((item, index) => {
                        return (
                            <SingleBlogCard key={index} blog={item} />
                        )
                    })
                : <p>No Blogs Added</p>
                }
            </div>
        </div>
    )
}
export default BlogList;