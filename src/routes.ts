
import { Router } from 'express';

import { CreateNewUser} from './controllers/users/CreateUser';
import { ListAllUsers } from './controllers/users/ListUsers';
import { Auth } from './controllers/users/Auth';
import { ValidateAuth } from './controllers/users/ValidateAuth';
import { DeleteUsers} from './controllers/users/DeleteUsers';
import { EditUserInfo } from './controllers/users/EditUserInfo';

import { CreateWatchList } from './controllers/WatchList/CreateWatchList';
import { AddMoviesWatchList } from './controllers/MoviesOnList/AddMoviesWatchList';
import { ListWatchListByUser } from './controllers/WatchList/ListWatchListByUser';
import { DeleteWatchList } from './controllers/WatchList/DeleteWatchList';
import { ListPopularWacthList } from './controllers/WatchList/ListPopularWacthList';
import { ListWatchListById } from './controllers/WatchList/ListWatchListById';
import { ListMoviesOnWatchList } from './controllers/MoviesOnList/ListMoviesOnWatchList';
import { GetUserById } from './controllers/users/GetUserById';
import { UpdateWatchList } from './controllers/WatchList/UpdateWatchList';
import { NewLike } from './controllers/UserInteractions/NewLike';

const router = Router()

const createUser = new CreateNewUser()
const listUsers = new ListAllUsers()
const auth = new Auth()
const userById = new GetUserById()
const validateAuth = new ValidateAuth()
const deleteUsers = new DeleteUsers()
const editUserInfo = new EditUserInfo()

const createWatchList = new CreateWatchList()
const listWatchListByUser = new ListWatchListByUser()
const listWatchListById = new ListWatchListById()
const addMovie = new AddMoviesWatchList()
const deleteWatchList = new DeleteWatchList()
const listPopularWacthList = new ListPopularWacthList()
const updateWatchlist = new UpdateWatchList()

const moviesOnLists = new ListMoviesOnWatchList()
const newLike = new NewLike()
//USERS
router.get('/listUsers', listUsers.handle)
router.post('/createNewUser', createUser.handle)
router.post('/auth', auth.handle)
router.get('/userById/:id', userById.handle)
router.get('/validateAuth', validateAuth.handle)
router.delete('/deleteUsers', deleteUsers.handle)
router.put('/editUserInfo', editUserInfo.handle);
//USERS

//WATCHLISTS
router.post('/createNewWatchList', createWatchList.handle)
router.get('/listWatchListByUser/:id', listWatchListByUser.handle)
router.get('/listWatchListById/:id', listWatchListById.handle)
router.delete('/deleteWatchList/:watchListId', deleteWatchList.handle)
router.post('/addMovie', addMovie.handle)
router.put('/updateWatchlist', updateWatchlist.handle)
router.get('/ListPopularWacthList', listPopularWacthList.handle)
//WATCHLISTS

router.post('/MoviesOnLists', moviesOnLists.handle)
router.post('/newLike', newLike.handle)

export {router}