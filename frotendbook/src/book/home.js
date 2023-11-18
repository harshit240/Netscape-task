import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState();

  const getBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      console.log('Get successful:', response.data);
      setData(response.data.books)
    } catch (error) {
      console.error('Get failed:', error);
    }
  }
  useEffect(() => {
    getBooks();
  }, [])

  return (
    <>
      <table id="customers">
        <tr>
          <th>Book Title</th>
          <th>Author</th>
          <th>Published At</th>
          <th>Copies</th>
          <th>Action</th>
        </tr>
        {
          data?.map((val,key) => {
            return (
              <tr key={key}>
                <td>{val?.title}</td>
                <td>{val?.author}</td>
                <td>{val?.published_at}</td>
                <td>{val?.copies}</td>
                <td>
                  <Link type="button" to={`/edit/${val._id}`} className='btn btn-primary'>Edit</Link>
                  <Link type="button" to={`/delete/${val._id}`} className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
            )
          })
        }

      </table>
    </>
  )
}

export default Home
