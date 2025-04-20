import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './redux/store.js';
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

// Auth
import AdminRoute from './pages/Admin/AdminRoute';
import GenreList from './pages/Admin/GenreList';




// Restricted

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './pages/Auth/PrivateRoute';
import Home from './pages/Home.jsx';
import Profile from './pages/User/Profile';
import CreateMovie from './pages/Admin/CreateMovie';
import AdminMoviesList from './pages/Admin/AdminMoviesList';
import UpdateMovie from './pages/Admin/UpdateMovie';
import AllMovies from './pages/Movies/AllMovies';
import MovieDetailes from './pages/Movies/MovieDetailes';
import AllComments from './pages/Admin/AllComments';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<Home />} />
            <Route path='/movies' element={<AllMovies />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/movies/:id' element={<MovieDetailes />} />
            <Route path='' element={<PrivateRoute />} >
                <Route path='/profile' element={<Profile />} />
            </Route>

            <Route path='' element={<AdminRoute />}>
                <Route path='/admin/movies/genre' element={<GenreList />} />
                <Route path='/admin/movies/create' element={<CreateMovie />} />
                <Route path='/admin/movies-list' element={<AdminMoviesList />} />
                <Route path='/admin/movies/update/:id' element={<UpdateMovie />} />
                <Route path='/admin/movies/comments' element={<AllComments />} />
                <Route path='/admin/movies/dashboard' element={<AdminDashboard />} />
            </Route>
        </Route>
    )
);




createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
