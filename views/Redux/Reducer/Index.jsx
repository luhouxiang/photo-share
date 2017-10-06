import { combineReducers } from 'redux'
import {
    ADD_TODO, REQUEST_POSTS,
    RECEIVE_POSTS, FETCHITEMS,
    OPEN_DIALOG, CLOSE_DIALOG,
    ADD_COMMENT, OPEN_DRAWER,
    CLOSE_DRAWER
} from '../Action/Index'

const todos = (state = [], action) => {
    switch(action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        default:
            return state
    }
}

const initialState = {receivePosts: []}
const items = (state = initialState, action) => {
    switch(action.type) {
        case FETCHITEMS:
            return {...state, receivePosts: action.items}
        default:
            return state
    }
}

const posts = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch(action.type) {
        case REQUEST_POSTS:
            return {...state, isFetching: true}
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts
            }
        default:
            return state
    }
}

const postsBySubreddit = (state = {}, action) => {
    switch(action.type) {
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return {...state, [action.subreddit]: posts(state[action.subreddit], action)}
        default:
            return state
    }
}

const doWithDialog = (state = {show: false, dialogContents: []}, action) => {
    switch(action.type) {
        case OPEN_DIALOG:
        case CLOSE_DIALOG:
            return {...state, show: action.show, dialogContents: action.dialogContents}
        default:
            return state
    }
}

const addComment = (state = {wholeComment: []}, action) => {
    switch(action.type) {
        case ADD_COMMENT:
            return {...state, wholeComment: action.wholeComment}
        default:
            return state
    }
}

const doWithDrawer = (state = {show: false}, action) => {
    switch(action.type) {
        case OPEN_DRAWER:
        case CLOSE_DRAWER:
            return {
                ...state,
                show: action.show,
            }
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos,
    items,
    postsBySubreddit,
    doWithDialog,
    addComment,
    doWithDrawer
})

export default todoApp