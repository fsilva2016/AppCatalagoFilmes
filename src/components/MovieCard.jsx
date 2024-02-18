
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const imgApi = import.meta.env.VITE_IMG;

export default function MovieCard({ movie, showLink = true }) {
    const [nota, setNota] = useState(null);
    const randomNuber = (nota) => {
        return (Math.round(nota * 10) / 10)
    }
    return (
        <div className='movie-card'>
            <img src={imgApi + movie.poster_path} alt={movie.title} />
            {showLink && (
                <>
                    <h3>
                        {movie.original_title}
                    <p>
                        {randomNuber(movie.vote_average)}
                        <i className='icons'><FaStar /> </i>
                    </p>
                    </h3>
                    

                    <Link to={`/movie/${movie.id}`}>Detalhes </Link>
                </>
            )
            }
        </div>
    )
}
