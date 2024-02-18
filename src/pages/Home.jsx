import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from 'react-bootstrap/Pagination';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
import './MoviesGrid.css'

const Home = () => {
   const [movies, setMovies] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totaPages, setTotaPages] = useState(null);
   const pageSize = 10;

   const getTopRatedMovies = async (url) => {
      const res = await fetch(url);
      const data = await res.json(); console.log(data);
      setMovies(data.results)
      setTotaPages(data.total_pages)

   }
   useEffect(() => {
      const topRateUrl = `${moviesURL}top_rated?${apiKey}&page=${currentPage}`;
      getTopRatedMovies(topRateUrl);
   }, [currentPage])

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage)
   }
   const renderPageNumbers = () => {

      const pageNumbers = [];
      const maxPage = Math.ceil(totaPages / pageSize);
      const startPage = Math.max(1, Math.floor((currentPage - 1) / pageSize) * pageSize + 1);
      const endPage = Math.min(startPage + pageSize - 1, maxPage)
      for (let i = startPage; i <= endPage; i++) {
         pageNumbers.push(
            // <button
            //    key={i}
            //    onClick={() => handlePageChange(i)}
            //    className={i === currentPage ? 'active' : ''}
            // >
            //    {i}
            // </button>
            <Pagination.Item key={i} onClick={() => handlePageChange(i)}>
               {i}
            </Pagination.Item>,
         );
      }
      console.log(pageNumbers)
      return pageNumbers;
   }

   return (
      <>
         <div className="container">
            {movies.length === 0 && <p>Carregando</p>}
            <div>
               <h2 className="title">Melhores filmes:</h2>
               <div className="movies-container">
                  {movies.length > 0 &&
                     movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
               </div>
            </div>
            <div>
               <Pagination className="pages">
                  <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</Pagination.Prev>
                  <Pagination>{renderPageNumbers(1)}</Pagination>              
                  <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totaPages}>Próxima</Pagination.Next>            
               </Pagination>
            </div>
         </div>

      </>
   )
}
export default Home;