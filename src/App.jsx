import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import BlogList from './components/blog-list'
import AddBlog from './components/add-blog';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='text-center'>Blog Application</h1>
        <hr/>
          <div className='container mx-auto'>
            <div className='row'>
              <div className='col-md-12 col-lg-4'>
                <AddBlog />
              </div>
              <div className='col-md-12 col-lg-8'>
              <BlogList />
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
