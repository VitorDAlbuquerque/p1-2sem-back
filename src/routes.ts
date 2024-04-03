
import { Router } from 'express';

import { CreateNewUser} from './controllers/users/CreateUser';
import { ListAllUsers } from './controllers/users/ListUsers';
import { Auth } from './controllers/users/Auth';
import { ValidateAuth } from './controllers/users/ValidateAuth';
import { CreateWatchList } from './controllers/WatchList/CreateWatchList';
import { DeleteUsers} from './controllers/users/DeleteUsers';
import { UpdateWatchList} from './controllers/WatchList/UpdateWatchList';

const router = Router()

const createUser = new CreateNewUser()
const listUsers = new ListAllUsers()
const auth = new Auth()
const validateAuth = new ValidateAuth()
const createWatchList = new CreateWatchList()
const deleteUsers = new DeleteUsers()
const updateWatchList = new UpdateWatchList()

router.get('/listUsers', listUsers.handle)
router.post('/createNewUser', createUser.handle)
router.post('/auth', auth.handle)
router.get('/validateAuth', validateAuth.handle)
router.post('/createNewWatchList', createWatchList.handle)
router.delete('/deleteUsers', deleteUsers.handle)
router.put('/alterWatchList', updateWatchList.handle)

export {router}