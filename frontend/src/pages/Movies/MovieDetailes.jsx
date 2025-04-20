import React from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetSpecificMovieQuery,
    useAddMovieReviewMutation,
} from '../../redux/api/movies';
import MovieTabs from './MovieTabs';

const MovieDetailes = () => {

    const { id: movieId } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
    const { userInfo } = useSelector((state) => state.auth);
    const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                id: movieId,
                rating,
                comment
            }).unwrap();

            refetch();

            toast.success("Review created successfully.");

        } catch (error) {
            toast.error(error.data || error.message);
        }
    }



    return (
        <>
            <div>
                <Link to="/" className='text-white font-semibold hover:underline ml-[20rem]'>
                    Go Back
                </Link>
            </div>
            <div className="mt-[2rem] mb-[9rem] w-auto">
                <div className="flex justify-center items-center">
                    <img src={movie?.image} alt={movie?.name} className="w-[70%] rounded" />
                </div>
                {/* container One */}
                <div className="container flex justify-between ml-[13rem] w-[70%] mt-[3rem]">
                    <section className='w-[70%] mb-[2rem]'>
                        <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
                        <p>{movie?.detail}</p>
                    </section>
                    <div className="">
                        <p className="text-2xl font-semibold">Relesing Date: {movie?.year}</p>
                        <div className="">
                            {movie?.cast.map((c) => (
                                <ul key={c._id}>
                                    <li className='mt-[1rem]'>{c}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="container ml-[13rem] w-auto">
                    <MovieTabs
                        loadingMovieReview={loadingMovieReview}
                        userInfo={userInfo}
                        submitHandler={submitHandler}
                        rating={rating}
                        setRating={setRating}
                        comment={comment}
                        setComment={setComment}
                        movie={movie} />
                </div>
            </div>
        </>
    );
}

export default MovieDetailes;