export const BlogActionType = {
    ADD_BLOG : '[BlogItem] Add Blog item',
    UPDATE_BLOG : '[BlogItem] Update Blog item'
}

//Method to add New Blogs.
export const addTodoItemAction = (url,payload) => {
    return dispatch => {
        return fetch(url,{
            method: 'POST',
            headers: {
                        'Content-Type': 'application/json',
                      },
            body: JSON.stringify(payload),
        }).then(res => {
            return res.json();
        }).then(res => {
            dispatch({type : BlogActionType.ADD_BLOG,
                to_be_added_payload : res })
        }).catch(err => {
            console.log('API failed')
        })
    }
}

//Action method to Get Blogs to the api using Fetch
const getBlogs = (url) => {
    return dispatch => {
        return fetch(url, { method: 'GET'}).then(res => {
            return res.json();
        }).then(res => {
            dispatch({type : 'GET_BLOG_DATA',
                    blogs : res })
        }).catch(err => {
            console.log('API failed')
        })
    }
}
export default getBlogs