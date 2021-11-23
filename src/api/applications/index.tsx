import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import axios from "axios";
import CONFIG from "../../constants/config";
// const proxy = require("http-proxy-middleware");

// const express = require("express");
// const cors = require("cors");
// const http = require("http");
// const app = express();

const cache = new InMemoryCache({ addTypename: false });

const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  link: new HttpLink({
    uri: CONFIG.API_URL,
    credentials: "same-origin",
  }),
  cache,
  defaultOptions,
});

// const server = http.createServer(app);
// const cors = require("cors");
// let whitelist = ["http://localhost:3000"];
// var corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));

export const getApplications = async () => {
  const url = CONFIG.API_URL;

  try {
    const res = axios.get(url);
    console.log({ res });
  } catch (error) {
    console.log({ error });
  }
};
