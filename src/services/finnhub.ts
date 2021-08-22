const finnhub = require('finnhub');

finnhub.ApiClient.instance.authentications.api_key.apiKey =
  process.env.REACT_APP_FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();

type IndicesConstituentsData = {
  constituents: string[];
  symbol: string;
};
export function getIndicesConstituents(
  index: string
): Promise<{ data: IndicesConstituentsData; response: any }> {
  return new Promise((resolve, reject) => {
    finnhubClient.indicesConstituents(
      index,
      (error: string, data: IndicesConstituentsData, response: any) => {
        if (error) {
          reject(error);
        }
        resolve({ data, response });
        console.log(data);
      }
    );
  });
}

export type StockQuoteData = {
  symbol: string;
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
};
export function getStockQuote(
  symbol: string
): Promise<{ data: StockQuoteData; response: any }> {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(
      symbol,
      (error: string, data: StockQuoteData, response: any) => {
        if (error) {
          reject(error);
        }
        resolve({ data: { ...data, symbol }, response });
        console.log(data);
      }
    );
  });
}
