import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';


const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get('q')

    const getSearchMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results)
     }
     useEffect(() => {
        const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}`;
        getSearchMovies(searchWithQueryUrl);
     }, [query])

    return (
        <>
            <div className="container">           
               <div>
                  <h2 className="title">Resultado para <span className="query-text">{query}</span></h2>

                  { movies.length ===0  && <p>Carregando</p>}
                <div className="movies-container">
                    {movies.length > 0 && 
                        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                        }
                </div>
               </div>
          
                
            </div>
        </>
    )
}
export default Search;