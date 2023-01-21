# SellScale Stock App take home

### `docker compose up -d`

Builds the app and runs it.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Notes

`UserId` is currently hardcoded into the app, so there's one shared stock buying experience.

Ticker symbols that contain a `/`, `BRK/A` for instance, connot be fetched.

I would have like to have stacked shares of the same stock.

Portfolio stocks display their purchase price, but not their current price.

I wanted a list of legal ticker symbols, but the only free resource I was able to find (https://github.com/shilewenuw/get_all_tickers) seems to be broken at the moment due to a Nasdaq API update. I did play with that API, see [this page](https://api.nasdaq.com/api/screener/stocks), but they had CORS disabled and I was getting off on a tangent, so I saved the data to a JSON file. Good enough to build against.
