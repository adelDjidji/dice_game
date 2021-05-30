import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings:{
    maxScore:false,
    winner:null
  },
  players:[
    {
      name:"Player 1",
      active:true,
      score:0
    },
    {
      name:"Player 2",
      active:false,
      score:0
    }
  ]
};

export const gameReducer = createSlice({
  name: 'game',
  initialState,
  reducers: {
    saveSettings:(state, action)=>{
      console.log("action",action);
      state.settings.maxScore = action.payload.maxScore
      state.players[0].name = action.payload.player1
      state.players[1].name = action.payload.player2

    },
    resetGame:(state)=>{
      state=initialState
    },
    addPlayerScore:(state, action)=>{
      let {index, score} = action.payload
      state.players[index].score += score
      if(state.players[index].score>=state.settings.maxScore){
        state.settings.winner=state.players[index].name
      }
    },
    runPlayer2:(state, action)=>{
      
    }

  },

});

export const { saveSettings, resetGame, addPlayerScore, runPlayer2 } = gameReducer.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;


export default gameReducer.reducer;
