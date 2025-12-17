import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../Components/home/BooksTable';
import BooksCard from '../Components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-center items-center gap-x-6 mb-8'>
          <button onClick={() => setShowType('table')}>
            Table View
          </button>
          <button onClick={() => setShowType('card')}>
            Card View
          </button>
        </div>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold'>Books List</h1>
          <Link to='/books/create' className='text-5xl hover:scale-110 transition-transform'>
            <MdOutlineAddBox />
          </Link>
        </div>
        <div className='flex justify-center'>
          {loading ? (
            <Spinner />
          ) : showType === 'table' ? (
            <BooksTable books={books} />
          ) : (
            <BooksCard books={books} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;