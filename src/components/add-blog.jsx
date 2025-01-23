import { useForm } from "react-hook-form";
import { addBlog, deSelectEditBlog, updateBlog } from "../store/slice/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const AddBlog = () => {
    const { editBlogId, blogs } = useSelector((store) => store.blogs);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const {register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm();
    if(editBlogId !== null){
        const getBlogVal = blogs.find((item) => item.id === editBlogId);
        setValue("title", getBlogVal.title);
        setValue("description", getBlogVal.body)
    }
    const onSubmitHandle = (data) => {
        setLoading(true);
        // e.preventDefault();
        console.log("form submited : ", data);
        if(editBlogId === null){
            dispatch(addBlog(data))
        }else{
            const getBlogVal = blogs.find((item) => item.id === editBlogId);
            const copyEditBlog = {...getBlogVal};
            copyEditBlog.title = data.title;
            copyEditBlog.body = data.description;
            dispatch(updateBlog(copyEditBlog));
        }
        reset();
        setLoading(false);
    }
    // console.log(errors);
    // console.log(watch("title"));
    return(
        <div className="form_wrapper position-sticky mb-5" style={{top:"10%"}}>
            <form onSubmit={handleSubmit(onSubmitHandle)}>
            {editBlogId !== null && <span onClick={() => {
                dispatch(deSelectEditBlog(editBlogId));
                reset();
                }} className="close_edit float-right">x</span>}
                <h4>{editBlogId == null ? "Add" : "Edit"} Blog</h4>
                <div className="form-control-wrap mb-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" className="form-control" {...register("title", {required: "This field can not be blank!", minLength : 3})} />
                    <p className="text-danger">{errors.title && errors.title.type == 'required' && errors.title.message}
                    {errors.title && errors.title.type == 'minLength' && `Minimun 3 letter should be there!`}</p>
                </div>
                <div className="form-control-wrap mb-2">
                    <label htmlFor="description">Description : </label>
                    <textarea id="description" className="form-control" {...register("description", {required: "This field can not be blank!"})}></textarea>
                    <p className="text-danger">{errors.description && errors.description.type == 'required' && errors.description.message}</p>
                </div>
                <button type="submit" disabled={loading ? true : false }>{editBlogId == null ? "Add Blog" : "Update Blog"}</button>
            </form>
        </div>
    )
}

export default AddBlog;