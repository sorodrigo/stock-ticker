## Stocks Ticker by Rodrigo Solís
![stock-ticker](stock-ticker.gif)

### Set up credentials
This app uses finnhub to retrieve the stocks data, in order to be able to run the app you need to [create an account](https://finnhub.io/register) and [retrieve the API key](https://finnhub.io/dashboard).
Once you have the API key make sure to add it to the application by duplicating the `.env` file as `.env.local` and setting the value of `REACT_APP_FINNHUB_KEY`.

### How to run
Please make sure you install the dependencies running:
```
yarn install
```

Once this finish you can run it using the following command:
```
yarn start
```

### Design inspiration
In order to create this widget I inspired myself in the following designs:

- [Stock Widget by Anthony Nguyen](https://dribbble.com/shots/2291008-Stock-Widget)
- [Cryptocurrency Tracker/Ticker by Glen Baku][https://dribbble.com/shots/3673913-Cryptocurrency-Tracker-Ticker]

For the animation, I blatantly copied [the implementation from react-spring examples](https://codesandbox.io/s/49jsc).

### Tests
I ran out of time before getting to the unit tests :(

### More considerations
When the time was up, I was in the middle of refactoring and cleaning the code so I changed branch and finished my refactor in a different branch.
The `final` branch has the code after the refactor, in this branch I don't handle extra acceptance criteria cause that would be _cheating_ it's just about polishing it a bit.

- `master` branch has the code I managed to write from start 2PM till 4:30ish. (2.5hrs)
- `final` branch has the code I wrote from start at 2PM till 6:00PM. (4hrs)

