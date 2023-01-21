import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tickersReducer from '../features/ticker/tickerSlice';
import stockReducer from '../features/ticker/tickerSlice';
import portfolioReducer from '../features/ticker/tickerSlice';

export const store = configureStore({
  reducer: {
    tickers: tickersReducer,
    stock: stockReducer,
    portfolio: portfolioReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
