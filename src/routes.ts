
import { Router } from 'express';

import { CreateNewUser} from './controllers/users/CreateUser';
import { ListAllUsers } from './controllers/users/ListUsers';
import { Auth } from './controllers/users/Auth';
import { ValidateAuth } from './controllers/users/ValidateAuth';
import { CreateWatchList } from './controllers/WatchList/CreateWatchList';
import { Movies } from './controllers/WatchList/Movies';

const router = Router()

const createUser = new CreateNewUser()
const listUsers = new ListAllUsers()
const auth = new Auth()
const validateAuth = new ValidateAuth()
const createWatchList = new CreateWatchList()
const addMovie = new Movies()

router.get('/listUsers', listUsers.handle)
router.post('/createNewUser', createUser.handle)
router.post('/auth', auth.handle)
router.get('/validateAuth', validateAuth.handle)
router.post('/createNewWatchList', createWatchList.handle)
router.post('/addMovie', addMovie.handle)

export {router}