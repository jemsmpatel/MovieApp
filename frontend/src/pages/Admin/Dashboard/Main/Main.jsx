import React from 'react';
import ScondaryCard from './ScondaryCard';
import VideoCard from './VideoCard';
import RealTimeCard from './RealTimeCard';
import {
    useGetAllMoviesQuery,
    useGetTopMoviesQuery,
} from '../../../../redux/api/movies';
import { useGetUsersQuery } from '../../../../redux/api/users';

const Main = () => {

    const { data: topMovies } = useGetTopMoviesQuery();
    const { data: visitors } = useGetUsersQuery();
    const { data: allMovies } = useGetAllMoviesQuery();

    const totalCommentsLength = allMovies?.map((m) => m.numReviews);
    const sumOfCommentsLength = totalCommentsLength?.reduce((acc, length) => acc + length, 0);





    return (
        <div>
            <section className='flex justify-around mb-[10rem]'>
                <div className="ml-[18rem] mt-10 w-[50%]">
                    <div className="-translate-x-4 flex">
                        <ScondaryCard pill="Users" content={visitors?.length} info="20.2k more then usual" gradient="from-teal-500 to-lime-400" />
                        <ScondaryCard pill="Comments" content={sumOfCommentsLength} info="742.8 more then usual" gradient="from-[#CCC514] to-[#CDCBBE]" />
                        <ScondaryCard pill="Movies" content={allMovies?.length} info="372+ more then usual" gradient="from-green-500 to-lime-400" />
                    </div>

                    <div className="flex justify-between w-[98%] text-white mt-10 font-bold">
                        <p>Top Content</p>
                        <p>Comments</p>
                    </div>
                    {topMovies?.map((movie) => (
                        <VideoCard key={movie._id} image={movie.image} title={movie.name} data={movie.year} comments={movie.numReviews} />
                    ))}
                </div>
                <div>
                    <RealTimeCard />
                </div>
            </section>
        </div>
    );
}

export default Main;