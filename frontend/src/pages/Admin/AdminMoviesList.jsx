import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllMoviesQuery } from '../../redux/api/movies';


const AdminMoviesList = () => {

    const { data: movies } = useGetAllMoviesQuery();

    return <div className='w-full'>
        <div className="flex flex-col md:flex-row">
            <div className="p-3">
                <div className="ml-[2rem] text-xl font-bold h-12">
                    All Movies ({movies?.length})
                </div>
                <div className="flex flex-wrap justify-around items-center p-[2rem]">
                    {movies?.map((movie) => (
                        <Link
                            key={movie._id}
                            to={`/admin/movies/update/${movie._id}`}
                            className='block mb-4 w-[30%] overflov-hidden'
                        >
                            <div className="flex">
                                <div className="max-w-sm m-[2rem] rounded overflow-hidden shadow-lg">
                                    <div className='border border-gray-400'>
                                        <img src={movie.image} alt={movie.name} className='w-full h-48 object-cover' />
                                        <div className="px-6 border-t-1 border-gray-400 py-4">
                                            <div className="font-bold text-xl mb-2">{movie.name}</div>
                                        </div>
                                        <p className="p-2 border-t-1 border-gray-400 text-base">{movie.detail}</p>
                                        <div className="pt-[1rem] border-t-1 border-gray-400 flex justify-center mb-[1rem]">
                                            <button className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Update Movie</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
};

export default AdminMoviesList;