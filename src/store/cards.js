import { createSlice } from '@reduxjs/toolkit';

import FireBaseClass from '../service/firebaseInit';

export const slice = createSlice({
  name: 'cards',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
    selectedCards: {},
    player2: [],
    board: [],
    choiceCard: [],
  },
  reducers: {
    fetchCards: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchCardsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchCardsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
      error: action.payload,
    }),
    handleSelectedCards: (state, { payload: { card, key } }) => {
      const newCards = { ...state.selectedCards };
      if (newCards[key]) {
        delete newCards[key];
        return { ...state, selectedCards: newCards };
      }
      newCards[key] = card;
      return { ...state, selectedCards: newCards };
    },
    cleanCards: (state) => ({
      ...state,
      data: {},
      selectedCards: {},
      player2: [],
      board: [],
      choiceCard: [],
    }),
    addNewCard: (state, action) => ({
      ...state,
      ...state.data,
      data: action.payload,
    }),
    setBoard: (state, action) => ({
      ...state,
      ...state.board,
      board: action.payload,
    }),
    setPlayer2: (state, action) => ({
      ...state,
      player2: action.payload.data.map((item) => ({
        ...item,
        possession: 'red',
      })),
    }),
    choiceCard: (state, action) => ({
      ...state,
      ...state.choiceCard,
      choiceCard: action.payload,
    }),
  },
});

export const {
  fetchCards,
  fetchCardsResolve,
  fetchCardsReject,
  handleSelectedCards,
  setPlayer2,
  setBoard,
  addNewCard,
  cleanCards,
  choiceCard,
} = slice.actions;

export const selectCardsLoading = (state) => state.cards.isLoading;
export const selectCardsData = (state) => state.cards.data;
export const selectedCards = (state) => state.cards.selectedCards;
export const boarding = (state) => state.cards.board;
export const cardsOfPlayer2 = (state) => state.cards.player2;
export const choiceCardRequest = (state) => state.cards.choiceCard;

export const getCardsAsync = () => async (dispatch) => {
  dispatch(fetchCards());
  const data = await FireBaseClass.getCardsOnce();
  dispatch(fetchCardsResolve(data));
};

export const getPlayer2CardsAsync = () => async (dispatch) => {
  dispatch(fetchCards());
  const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
  const boardRequest = await boardResponse.json();
  dispatch(setBoard(boardRequest.data));

  const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
  const player2Request = await player2Response.json();
  dispatch(setPlayer2(player2Request));
};

export const choiceCardAsync = (params) => async (dispatch) => {
  const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const request = await res.json();
  dispatch(choiceCard(request.data));
};

export const addCardsAsync = (card) => (dispatch) => {
  FireBaseClass.setCard(card, () => dispatch(addNewCard(card)));
};

export default slice.reducer;
