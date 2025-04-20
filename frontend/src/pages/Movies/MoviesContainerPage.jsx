import React from 'react';
import { useState } from 'react';
import {
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
} from '../../redux/api/movies';
import { useFetchGenresQuery } from '../../redux/api/genre';
import SliderUtil from '../../component/SliderUtil';

const MoviesContainerPage = () => {

    const { data } = useGetNewMoviesQuery();
    const { data: topMovies } = useGetTopMoviesQuery();
    const { data: genres } = useFetchGenresQuery();
    const { data: randomMovies } = useGetRandomMoviesQuery();

    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
    }

    const filteredMovies = data?.filter((movie) => selectedGenre === null || movie.genre === selectedGenre);


    return (
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
            <nav className=" ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
                {genres?.map((g) => (
                    <button
                        key={g._id}
                        className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${selectedGenre === g._id ? "bg-gray-200" : ""
                            }`}
                        onClick={() => handleGenreClick(g._id)}
                    >
                        {g.name}
                    </button>
                ))}
            </nav>

            <section className="flex flex-col mr-3 justify-center items-center w-full lg:w-auto" style={{ width: "1050px" }}>
                <div className="w-auto lg:w-auto mb-8 ">
                    <h1 className="mb-5">Choose For You</h1>
                    <SliderUtil data={randomMovies} />
                </div>

                <div className="w-auto lg:w-auto mb-8">
                    <h1 className="mb-5">Top Movies</h1>
                    <SliderUtil data={topMovies} />
                </div>

                <div className="w-auto lg:w-auto mb-8">
                    <h1 className="mb-5">Choose Movie</h1>
                    <SliderUtil data={filteredMovies} />
                </div>
            </section>
        </div >
    );
};

export default MoviesContainerPage;