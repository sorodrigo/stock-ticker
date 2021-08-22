const finnhub = require('finnhub');

finnhub.ApiClient.instance.authentications.api_key.apiKey =
  process.env.REACT_APP_FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();

export function getIndicesConstituents(
  index: string
): Promise<{ data: any[]; response: any }> {
  return new Promise((resolve, reject) => {
    finnhubClient.indicesConstituents(
      index,
      (error: string, data: any[], response: any) => {
        if (error) {
          reject(error);
        }
        resolve({ data, response });
        console.log(data);
      }
    );
  });
}

export function getStockQuote(
  symbol: string
): Promise<{ data: Record<string, number>[]; response: any }> {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error: string, data: any[], response: any) => {
      if (error) {
        reject(error);
      }
      resolve({ data, response });
      console.log(data);
    });
  });
}
