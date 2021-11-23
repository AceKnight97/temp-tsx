import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
const CONFIG = {
  API_URL: "http://13.234.243.2:8080/e-core-uaa",
};
export const cache = new InMemoryCache({ addTypename: false });

export const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export default CONFIG;
