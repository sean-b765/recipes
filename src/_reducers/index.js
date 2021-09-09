import { combineReducers } from 'redux'

import auth from './auth'
import user from './user'
import postForm from './postForm'
import post from './post'

export default combineReducers({ auth, user, postForm, post })
