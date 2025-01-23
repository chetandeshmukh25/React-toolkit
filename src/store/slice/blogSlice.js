import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    "isLoading": false,
    "blogs": [],
    "error":"",
    "editBlogId":null
}

const blogSlice = createSlice({
    "name":"blog",
    initialState: initialState,
    reducers: {
        startLoading: (state) => {
            console.log('startLoading reducer called');
            state.isLoading = true;
            state.error = "";
            console.log("from action : ",state.isLoading)
        },
        blogErrorHandle: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message || "Something went wrong!";
        },
        addBlog : (state, action) => {
            const copyBlog = {id: null, title:'', body: '', reactions: {dislikes: 0, likes: 0}, tags: [],userId: null, views:0 };
            copyBlog.id = state.blogs[state.blogs.length - 1].id+1;
            copyBlog.title = action.payload.title;
            copyBlog.body = action.payload.description;
            copyBlog.userId = state.blogs[state.blogs.length - 1].userId+1;
            state.blogs.push(copyBlog)
            state.isLoading = false;
        },
        fetchBlogList : (state, action) => {
            console.log("fetch Blog data!");
            state.blogs = action.payload;
            state.isLoading = false;
        },
        selectEditBlog : (state, action) => {
            state.editBlogId = action.payload;
        },
        deSelectEditBlog : (state, action) => {
            state.editBlogId = null;
        },
        updateBlog : (state, action) => {
            const getBlogIndex = state.blogs.findIndex((item) => item.id === action.payload.id);
            state.blogs[getBlogIndex] = action.payload;
            state.editBlogId = null;
        },
        deleteBlog : (state, action) => {
            console.log("from delete : ", action)
            state.blogs = state.blogs.filter((item) => item.id !== action.payload)
        },
    }
})

export const { addBlog, fetchBlogList, deleteBlog, startLoading, blogErrorHandle, selectEditBlog, updateBlog, deSelectEditBlog } = blogSlice.actions;
export default blogSlice.reducer;