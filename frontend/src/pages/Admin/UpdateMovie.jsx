import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    useGetSpecificMovieQuery,
    useUpdateMovieMutation,
    useUploadImageMutation,
    useDeleteMovieMutation,
} from '../../redux/api/movies.js';
import { toast } from 'react-toastify';


const UpdateMovie = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [movieData, setMovieData] = useState({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        ratings: 0,
        image: null,
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const { data: initialMovieData } = useGetSpecificMovieQuery(id);
    useEffect(() => {
        if (initialMovieData) {
            setMovieData(initialMovieData);
        }
    }, [initialMovieData]);


    const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
    const [uploadImage, {
        isLoading: isUploadingImage,
        error: uploadImageErrorDetails
    }] = useUploadImageMutation();

    const [deleteMovie] = useDeleteMovieMutation();

    const handleChange = (e) => {
        const { name, value, } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    }

    const handleUpdateMovie = async () => {
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast ||
                !selectedImage
            ) {
                toast.error("Please fill in all required fields.");
            }

            let uploadedImagePath = movieData.image;

            if (selectedImage) {
                const formData = new FormData();
                formData.append('image', selectedImage);

                const uploadeImageResponse = await uploadImage(formData);

                if (uploadeImageResponse.data) {
                    uploadedImagePath = uploadeImageResponse.data.image;
                } else {
                    console.error("Failed to upload image: ", uploadImageErrorDetails);
                    toast.error("Failed to upload image");
                    return;
                }
            }

            await updateMovie({
                id: id,
                updatedMovie: {
                    ...movieData,
                    image: uploadedImagePath,
                }
            });

            navigate('/movies');



        } catch (error) {
            console.error("Failed to upload movie ", error);
        }
    }

    const handleDeleteMovie = async () => {
        try {
            toast.success("Movie deleted successfully");
            await deleteMovie(id);
            navigate('/movies');
        } catch (error) {
            console.error("Failed to delete movie ", error);
            toast.error(`Failed to delete movie ${error?.message}`);
        }
    }

    return <div className='container flex justify-center items-center mt-4 mb-[8rem]'>
        <form>
            <p className='text-green-200 w-[50rem] text-2xl mb-4'>Update Movie</p>
            <div className="mb-4">
                <label className='block'>
                    Name:
                    <input
                        type="text"
                        name='name'
                        value={movieData.name}
                        onChange={handleChange}
                        className='border px-2 py-1 w-full bg-white rounded-3'
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className='block'>
                    Year:
                    <input
                        type="number"
                        name='year'
                        value={movieData.year}
                        onChange={handleChange}
                        className='border px-2 py-1 w-full bg-white rounded-3'
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className='block'>
                    Detail:
                    <textarea
                        name='detail'
                        value={movieData.detail}
                        onChange={handleChange}
                        className='border px-2 py-1 w-full bg-white rounded-3'
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className='block'>
                    Cast (comma-separated):
                    <input
                        type="text"
                        name='cast'
                        value={movieData.cast.join(', ')}
                        onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })}
                        className='border px-2 py-1 w-full bg-white rounded-3'
                    />
                </label>
            </div>

            <div className="mb-4">
                <label style={!selectedImage ? { border: "1px solid #888", borderRadius: "5px", padding: "8px" } : { border: "0", borderRadius: "0", padding: "0" }}
                    className='btn btn-outline-info'>
                    {!selectedImage && "Upload Image"}
                    <input
                        type="file"
                        accept='image/*'
                        onChange={handleImageChange}
                        className='btn btn-outline-info'
                        style={{ display: !selectedImage ? "none" : "block" }}
                    />
                </label>
            </div>
            <div className="flex justify-between">
                <button
                    type='button'
                    onClick={handleUpdateMovie}
                    className='bg-teal-500 text-white px-4 py-2 rounded-3'
                    disabled={isUpdatingMovie || isUploadingImage}
                >
                    {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
                </button>
                <button
                    type='button'
                    onClick={handleDeleteMovie}
                    className='bg-red-500 text-white px-4 py-2 rounded-3 ml-[2rem]'
                    disabled={isUpdatingMovie || isUploadingImage}
                >
                    {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
                </button>
            </div>
        </form>
    </div>
};

export default UpdateMovie;