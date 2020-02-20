import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import {reducer as mainPageReducer} from '../pages/main-page/redux/reducer'

export default () => combineReducers({
    form: formReducer,
    mainPage: mainPageReducer
})