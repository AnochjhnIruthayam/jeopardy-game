import { combineReducers } from 'redux';
import {
  LOAD_GAME_DATA,
  ADD_PLAYER,
  UPDATE_SCORE,
  UPDATE_LAST_CORRECT_PLAYER,
  UPDATE_QUESTION,
} from '../actions/actions';

const INITIAL_STATE = {
  game: {
    jeopardy: {
      categories: {

      }
    },
    doubleJeopardy: {
      categories: {

      }
    },
    finalJeopardy: {
      
    }
  },
  players: [],
  lastCorrectPlayer: "",
  currentVersion: "jeopardy"
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_QUESTION:
      const questionIndex = state.game[state.currentVersion].categories[action.categoryIndex].findIndex(question => {
        return question.question === action.question.question;
      });
      const categories = state.game[state.currentVersion].categories;
      categories[action.categoryIndex][questionIndex] = {
        ...state.game[state.currentVersion].categories[action.categoryIndex][questionIndex],
        isAnswered: true
      };
      return {
        ...state,
        game: {
          ...state.game,
          [state.currentVersion]: {
            ...state.game[state.currentVersion],
            categories: {
              ...state.game[state.currentVersion].categories
              //...categories
            }
          }
        }
      };
    case UPDATE_LAST_CORRECT_PLAYER:
      return {
        ...state,
        lastCorrectPlayer: action.player
      };
    case UPDATE_SCORE:
      let index = state.players.findIndex(player => {
        return player.name === action.player
      });
      return {
        ...state,
        players: [
          ...state.players.slice(0, index),
          {
            name: action.player,
            score: state.players[index].score + action.value
          },
          ...state.players.slice(index + 1)
        ]
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [
          ...state.players,
          {
            name: action.player,
            score: action.score
          }
        ]
      };
    case LOAD_GAME_DATA:
      return {
        ...state,
        game: {
          ...action.data
        }
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  appReducer
});

export default rootReducer;
