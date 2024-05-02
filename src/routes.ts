
import { Router } from 'express';

import { CreateNewUser} from './controllers/users/CreateUser';
import { ListAllUsers } from './controllers/users/ListUsers';
import { Auth } from './controllers/users/Auth';
import { ValidateAuth } from './controllers/users/ValidateAuth';
import { DeleteUsers} from './controllers/users/DeleteUsers';
import { UpdateUser } from './controllers/users/UpdateUser';

import { CreateWatchList } from './controllers/WatchList/CreateWatchList';
import { AddMoviesWatchList } from './controllers/MoviesOnList/AddMoviesWatchList';
import { ListWatchListByUser } from './controllers/WatchList/ListWatchListByUser';
import { DeleteWatchList } from './controllers/WatchList/DeleteWatchList';
import { ListPopularWacthList } from './controllers/WatchList/ListPopularWacthList';
import { ListWatchListById } from './controllers/WatchList/ListWatchListById';
import { GetUserById } from './controllers/users/GetUserById';
import { UpdateWatchList } from './controllers/WatchList/UpdateWatchList';
import { UpdateUserTheme } from './controllers/users/UpdateUserTheme';
import { UpdatePassword } from './controllers/users/UpdatePassword';
import { ListWatchListByUserToken } from './controllers/WatchList/ListWatchListByUserToken';

import { ListMoviesOnWatchList } from './controllers/MoviesOnList/ListMoviesOnWatchList';

import { NewLike } from './controllers/UserInteractions/NewLike';
import { NewComment } from './controllers/Comments/NewComment';
import { ListComments } from './controllers/Comments/ListComments';
import { NewReview } from './controllers/Review/NewReview';
import { ListReview } from './controllers/Review/ListReview';
import { UpdateReview } from './controllers/Review/UpdateReview ';
import { DeleteReview } from './controllers/Review/DeleteReview';
import { UpdateComments } from './controllers/Comments/UpdateComments';
import { FavoriteMovie } from './controllers/UserInteractions/FavoriteMovie';
import { DeleteComments } from './controllers/Comments/DeleteComments';
import { ListFavoriteMovieByUser } from './controllers/UserInteractions/ListFavoriteMoviesByUser';
import { ListFavoriteMovieByMovie } from './controllers/UserInteractions/ListFavoriteByMovie';
import { GetReviewByUser } from './controllers/Review/GetReviewByUser';
import { ListReviewByUser } from './controllers/Review/ListReviewByUser';

const router = Router()

const createUser = new CreateNewUser()
const listUsers = new ListAllUsers()
const auth = new Auth()
const userById = new GetUserById()
const validateAuth = new ValidateAuth()
const deleteUsers = new DeleteUsers()
const updateUser = new UpdateUser()
const updateUserTheme = new UpdateUserTheme()
const updatePassword = new UpdatePassword()

const createWatchList = new CreateWatchList()
const listWatchListByUser = new ListWatchListByUser()
const listWatchListById = new ListWatchListById()
const addMovie = new AddMoviesWatchList()
const deleteWatchList = new DeleteWatchList()
const listPopularWacthList = new ListPopularWacthList()
const updateWatchlist = new UpdateWatchList()
const listWatchListByUserToken = new ListWatchListByUserToken()

const moviesOnLists = new ListMoviesOnWatchList()

const newLike = new NewLike()
const newComment = new NewComment()
const listComments = new ListComments()
const newReview = new NewReview()
const listReview = new ListReview()
const updateReview = new UpdateReview()
const deleteReview = new DeleteReview()
const updateComments = new UpdateComments()
const favoriteMovie = new FavoriteMovie()
const deleteComments = new DeleteComments()
const listFavoriteMovieByUser = new ListFavoriteMovieByUser()
const listFavoriteMovieByMovie = new ListFavoriteMovieByMovie()
const getReviewByUser = new GetReviewByUser()
const listReviewByUser = new ListReviewByUser()


//USERS
router.get('/listUsers', listUsers.handle)
router.post('/createNewUser', createUser.handle)
router.post('/auth', auth.handle)
router.get('/userById/:id', userById.handle)
router.get('/validateAuth', validateAuth.handle)
router.delete('/deleteUsers', deleteUsers.handle)
router.post('/updateUser', updateUser.handle)
router.put('/updateUserTheme', updateUserTheme.handle)
router.put('/updatePassword', updatePassword.handle)
//USERS

//WATCHLISTS
router.post('/createNewWatchList', createWatchList.handle)
router.get('/listWatchListByUser/:id', listWatchListByUser.handle)
router.get('/listWatchListByUserToken', listWatchListByUserToken.handle)
router.get('/listWatchListById/:id', listWatchListById.handle)
router.delete('/deleteWatchList/:watchListId', deleteWatchList.handle)
router.post('/addMovie', addMovie.handle)
router.put('/updateWatchlist', updateWatchlist.handle)
router.get('/ListPopularWacthList', listPopularWacthList.handle)
//WATCHLISTS

router.post('/MoviesOnLists', moviesOnLists.handle)

router.post('/newLike', newLike.handle)
router.post('/newComment', newComment.handle)
router.get('/ListComments/:watchlistId', listComments.handle)


router.post('/NewReview', newReview.handle)

router.get('/ListReview/:movieId', listReview.handle)
router.get('/GetReviewByUser/:movieId', getReviewByUser.handle)
router.put('/UpdateReview', updateReview.handle)
router.delete('/DeleteReview/:movieId', deleteReview.handle)
router.put('/UpdateComments', updateComments.handle)
router.post('/favoriteMovie', favoriteMovie.handle)
router.delete('/DeleteComments/:commentId', deleteComments.handle)
router.get('/listFavoriteMovieByUser/:userId', listFavoriteMovieByUser.handle)
router.get('/listFavoriteMovieByMovie/:movieId', listFavoriteMovieByMovie.handle)
router.get('/listReviewByUser/:userId', listReviewByUser.handle)


export {router}