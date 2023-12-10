import './Blogs.scss'
import BlogItem from './BlogItem/BlogItem.js'
import getBlogs from '../../Store/Actions/BlogsAction.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BlogForm from './BlogForm'

const mapStoreToProps = (state) => ( state.blogs );

const mapDispatchToProps = dispatch => bindActionCreators({
  getBlogs,
},dispatch);

class BlogsComponent extends Component {
  constructor(props) {
    super(props)
    this.callApi = this.callApi.bind(this);
    this.state = { showForm: false }
  }
  
  //Method to post a new Blog
  postBlog() {
    if (this.state.showForm === true) {
      this.setState({
        showForm: false
      })
    }
    else {
      this.setState({
        showForm: true
      })
    }
  }

  //Calls the same Url after the page is rendered
  componentDidMount() {
    this.callApi();
  }
  
  //api call 
  callApi = () => {    
    this.props.getBlogs('http://localhost:9002/blogsData')
  };

  render() {
    const blogs = this.props.blogs
    const items = blogs.map((blog,i) => <BlogItem 
    key={i}
    blogitem={blog} 
    index={i}>
    </BlogItem>)
    //HTML Representation of the entire Blogs Page.
    return (
      <div>
        <div className='blogs-container'>
          {items}
        </div>
        <button className='write-blog-button' onClick={this.postBlog.bind(this)}>Start a blog...</button>
        {this.state.showForm && (
        <BlogForm></BlogForm>
        )}
      </div>
    )
  }
}

const Blogs = connect(mapStoreToProps, mapDispatchToProps)(BlogsComponent)

export default Blogs