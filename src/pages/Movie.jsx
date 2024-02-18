import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';

import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
    BsFillCameraReelsFill,
    BsChatDots,
    BsAward

} from "react-icons/bs";
import { FaLink, FaStar } from "react-icons/fa";
import MovieCard from "../components/MovieCard";

import "./Movie.css";
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imgApi = import.meta.env.VITE_IMG;
const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const dataFormat = (data) => {
        console.log(data)
        return format(new Date(data), 'dd/MM/yyyy');
    }
    const getMovie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovie(data)
        console.log(data)
    }
    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apiKey}`;
        console.log(movieUrl)
        getMovie(movieUrl)
    }, [])
    const randomNuber = (nota) => {
        return (Math.round(nota * 10) / 10)
    }
    const formatCurrency = (number) =>{
        return number.toLocaleString("es-US",{
            style: "currency",
            currency: "USD"

        })
    }

    return (
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />

                    <div className="dadoInfoMovie">
                        <div className="info">
                            <h1>
                                {movie.original_title}
                                <p>
                                    {randomNuber(movie.vote_average)}
                                    <i className='icons'><FaStar /> </i>
                                </p>
                                <p className="tagline">{movie.tagline}</p>
                            </h1>
                        </div>
                        <div className="info">
                            <h3><BsWallet2 />Orçamento</h3>
                            <p>{formatCurrency(movie.budget)}</p>
                        </div>

                        <div className="info">
                            <h3><BsGraphUp />Receita</h3>
                            <p>{formatCurrency(movie.revenue)}</p>
                        </div>
                        <div className="info">
                            <h3><BsHourglassSplit />Duração</h3>
                            <p>{movie.runtime} minutos</p>
                        </div>
                        <div className="info description">
                            <h3><BsFillFileEarmarkTextFill />Descrição</h3>
                            <p>{movie.overview}</p>
                        </div>
                        <div className="info description">
                            <h3><BsFillCameraReelsFill />Produção</h3>
                            <p>{movie.production_countries[0].name}</p>
                            <h3><BsFillCameraReelsFill />Empresas</h3>
                            <p>{movie.production_companies[0].name}</p>
                        </div>
                        <div className="info description">
                            <h3><BsChatDots />Gênero</h3>
                            {movie.genres.map((item) => (
                                <span key={item.id}>  {item.name}, </span>
                            ))}
                        </div>
                        <div className="info description">
                            <h3><BsAward />Lançamento</h3>
                            {dataFormat(movie.release_date)}
                        </div>
                        <div className="info description">
                            <h3><FaLink />Site</h3>
                            <Link to={movie.homepage} target={"_blank"}>    {movie.homepage}</Link>
                        </div>
                    </div>

                </>
            )}
        </div>
    )

}
export default Movie;