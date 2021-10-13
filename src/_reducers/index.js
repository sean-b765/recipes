import { combineReducers } from 'redux'

import auth from './auth'
import user from './user'
import post from './post'
import postForm from './postForm'
import editForm from './editForm'

export default combineReducers({ auth, user, postForm, post, editForm })
