import AppState from '../State';
import { BlogActionType } from '../Actions/BlogsAction';

const BlogsReducer = (state=AppState, action) =>{
    const type = action.type;
    const to_be_added_payload = action.to_be_added_payload;
    let newBlogs;
    switch(type) {
        //Case to get the Blog Data.
        case 'GET_BLOG_DATA' :
            newBlogs = []
            let blogs = action.blogs
            blogs.forEach(function (item) {
                newBlogs.push(item);
              });
            break;
        case BlogActionType.ADD_TODO:
            //Case to Add a new Blog Item.
            newBlogs = [...state.todolist];
            newBlogs.push(to_be_added_payload);
            break;
        default:
            //Default Case to display if any field input is missing.
            newBlogs = [...state.blogs];
            break;
    }
    return Object.assign({}, state, { blogs : newBlogs });
}

export default BlogsReducer;
