
import { Router } from 'express';

import { CreateNewUser} from './controllers/users/CreateUser';
import { ListAllUsers } from './controllers/users/ListUsers';
import { Auth } from './controllers/users/Auth';
import { ValidateAuth } from './controllers/users/ValidateAuth';

import { CreateWatchList } from './controllers/WatchList/CreateWatchList';
import { AddMoviesWatchList } from './controllers/MoviesOnList/AddMoviesWatchList';
import { ListWatchListByUser } from './controllers/WatchList/ListWatchListByUser';
import { DeleteWatchList } from './controllers/WatchList/DeleteWatchList';
import { ListPopularWacthList } from './controllers/WatchList/ListPopularWacthList';
import { ListWatchListById } from './controllers/WatchList/ListWatchListById';
import { ListMoviesOnWatchList } from './controllers/MoviesOnList/ListMoviesOnWatchList';

const router = Router()

const createUser = new CreateNewUser()
const listUsers = new ListAllUsers()
const auth = new Auth()
const validateAuth = new ValidateAuth()

const createWatchList = new CreateWatchList()
const listWatchListByUser = new ListWatchListByUser()
const listWatchListById = new ListWatchListById()
const addMovie = new AddMoviesWatchList()
const deleteWatchList = new DeleteWatchList()
const listPopularWacthList = new ListPopularWacthList()

const moviesOnLists = new ListMoviesOnWatchList()

//USERS
router.get('/listUsers', listUsers.handle)
router.post('/createNewUser', createUser.handle)
router.post('/auth', auth.handle)
router.get('/validateAuth', validateAuth.handle)
//USERS

//WATCHLISTS
router.post('/createNewWatchList', createWatchList.handle)
router.get('/listWatchListByUser', listWatchListByUser.handle)
router.get('/listWatchListById/:id', listWatchListById.handle)
router.delete('/deleteWatchList/:watchListId', deleteWatchList.handle)
router.post('/addMovie', addMovie.handle)
router.get('/ListPopularWacthList', listPopularWacthList.handle)
//WATCHLISTS

router.post('/MoviesOnLists', moviesOnLists.handle)

export {router}