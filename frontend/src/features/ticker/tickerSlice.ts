import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { buyStock, fetchMyStock as fetchPortfolio, fetchStock, fetchTickers, sellStock, Stock } from './tickerAPI';

export interface TickerState {
  value: Stock[];
  stock: Stock | null;
  portfolio: Stock[];
  status: 'idle' | 'loading' | 'failed';
  userId: number
}

const initialState: TickerState = {
  value: [],
  stock: null,
  status: 'idle',
  portfolio: [],
  userId: 1
};

export const fetchTickersAsync = createAsyncThunk(
  'counter/fetchTickers',
  async () => {
    const response = await fetchTickers();
    return response;
  }
);

export const fetchStockAsync = createAsyncThunk(
  'counter/fetchStock',
  async (symbol: string) => {
    const response = await fetchStock(symbol);
    return response;
  }
);

export const fetchPortfolioAsync = createAsyncThunk(
  'counter/fetchPortfolio',
  async () => {
    const response = await fetchPortfolio(initialState.userId);
    return response;
  }
)

export const buyStockAsync = createAsyncThunk(
  'counter/buyPortfolio',
  async (stock: Stock) => {
    const response = await buyStock(initialState.userId, stock);
    return response;
  }
)

export const sellStockAsync = createAsyncThunk(
  'counter/sellPortfolio',
  async (key: string) => {
    const response = await sellStock(key);
    return response;
  }
)

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    // buyStock: (state, action: PayloadAction<any>) => { 
    //   state.portfolio.push(action.payload.symbol)
    // },
    // sellStock: (state, action: PayloadAction<any>) => {
    //   state.portfolio.splice(state.portfolio.indexOf(action.payload.symbol), 1)
    // },
  },
  extraReducers: (builder) => {
    builder
      //
      .addCase(fetchTickersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchTickersAsync.rejected, (state) => {
        state.status = 'failed';
      })
      ///
      .addCase(fetchStockAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.stock = action.payload;
      })
      .addCase(fetchStockAsync.rejected, (state) => {
        state.status = 'failed';
      })
      ///
      .addCase(fetchPortfolioAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPortfolioAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let keys = (action.payload) ? Object.keys(action.payload) : [];
        const portArr = keys.map( key => {    
        return {
            key, ...action.payload[key],
            }
        } );
        state.portfolio = portArr;
      })
      .addCase(fetchPortfolioAsync.rejected, (state) => {
        state.status = 'failed';
      })
      //
      .addCase(buyStockAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(sellStockAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })

  },
});

// export const { buyStock, sellStock } = tickerSlice.actions;

export const selectTickers = (state: RootState) => state.tickers.value;
export const selectStock = (state: RootState) => state.stock.stock;
export const selectPortffolio = (state: RootState) => state.portfolio.portfolio;

export default tickerSlice.reducer;
