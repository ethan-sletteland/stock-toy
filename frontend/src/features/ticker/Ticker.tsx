import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  buyStockAsync,
  fetchPortfolioAsync,
  fetchStockAsync,
  fetchTickersAsync,
  selectPortffolio,
  selectStock,
  selectTickers,
  sellStockAsync,
} from './tickerSlice';
import styles from './Ticker.module.css';
import { Autocomplete, Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import { Stock } from './tickerAPI';

export function Ticker() {
  const tickers = useAppSelector(selectTickers);
  const stock = useAppSelector(selectStock);
  const portfolio = useAppSelector(selectPortffolio);
  const dispatch = useAppDispatch();
  const [selectedTicker, setSelectedTicker] = useState(tickers[0]);

  useEffect(() => {
    dispatch(fetchTickersAsync())
    dispatch(fetchPortfolioAsync())
  }, [dispatch])

  const handleBuy = (stock: Stock) => { 
    dispatch(buyStockAsync(stock)).then(()=> dispatch(fetchPortfolioAsync()))
  }

  const handleSell = (stock: Stock) => { 
    if(stock.key) dispatch(sellStockAsync(stock.key)).then(()=> dispatch(fetchPortfolioAsync()))
  }


  return (
    <div>
      <div className={styles.row}>

        <Autocomplete
          onChange={(event: any, newValue: any | null) => {
            if(newValue){
              setSelectedTicker(newValue);
              dispatch(fetchStockAsync(newValue.id))
            }
          }}
          id="combo-box-tickers"
          options={tickers}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Tickers" />}
        />

        {selectedTicker?.name}
        {(stock)
          ? <div>
            <h2>{stock.shortName} ${ stock.ask }</h2>
              <img alt={stock.symbol} src={stock.logo_url}></img>
              <br />
              <Button variant="contained" onClick={() => handleBuy(stock)}>Buy { stock.symbol }</Button>
            </div>
          : null}
        {(portfolio)
          ? <div>
              <h2>My Portfolio</h2>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {portfolio?.map((p, i) => 
                <React.Fragment key={i}>
                  <ListItem alignItems="flex-start" key={i}>
                    <ListItemAvatar>
                      <Avatar alt={ p.symbol } src={ p.logo_url } />
                    </ListItemAvatar>
                    <ListItemText
                      primary={ p.shortName }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {p.symbol} bought at ${ p.ask }
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                    <Button variant="contained" onClick={() => handleSell(p)}>Sell</Button>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              )}
              </List>
            </div>
          : null}

        {/* <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(fetchTickersAsync())}
        >
          Add Async
        </button> */}
      </div>
    </div>
  );
}
