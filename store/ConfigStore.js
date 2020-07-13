import { createStore } from 'redux';
import toggleFavorite from './reducers/MainReducer';

export default createStore(toggleFavorite)