import React, { Component } from 'react'
import { addTodoItemAction } from '../../Store/Actions/BlogsAction.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MiniLoader from "../../components/Loader/MiniLoader";
import axios from "axios";

const mapDispatchToProps = dispatch => bindActionCreators({
    add: (url, payload) => dispatch(addTodoItemAction(url, payload))
  },dispatch);
  

export class BlogFormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            showForm: false
        }
      }

    //Adds new Blogs with title,description,author and Image url.
    addNewBlog() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const author = document.getElementById('author').value;
        const imgUrl = document.getElementById('imgUrl').value;
        let payload = {}
        if(!imgUrl){
           payload = {
            blogTitle: title,
            description: description,
            author: author,
          }
        }
        else{
          payload = {
            blogTitle: title,
            description: description,
            author: author,
            imgUrl: imgUrl
          }
        }
        console.log(JSON.stringify(payload))
        this.props.add("http://localhost:9002/blogsData/", payload)
      }
      //HTML Representation of the Blog Form
  render() {
    return (
        <form className="new-blog-form" method="get">
        <ul>
          <li>
            <input type="text" className="title" id="title" name="blog_title" placeholder="Title" />
          </li>
          <li>
            <textarea className="description" id="description" name="blog_description" placeholder='Write a blog...'></textarea>
          </li>
          <li>
            <input type="text" id="author" name="blog_author" placeholder='Author'/>
          </li>
          <li>
            <input type="url" className="imgUrl" id="imgUrl" name="blog_image" placeholder='Image Url'/>
          </li>
        </ul>
        <button className='post-button' onClick={this.addNewBlog.bind(this)}>Post</button>
      </form>
    )
  }
}

const BlogForm = connect(null, mapDispatchToProps)(BlogFormComponent)

export default BlogForm
