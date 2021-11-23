import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import CONFIG, { defaultOptions, cache } from "../../constants/config";

const axios = require("axios");

// axios.defaults.baseURL = CONFIG.API_URL;
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const GET_APPS_URL = "http://13.234.243.2:8080/e-core-uaa/api/apps";
const url = CONFIG.API_URL;

// const cors = require("cors");
// const express = require("express");
// const cors = require("cors");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// app.options("*", cors({ origin: CONFIG.API_URL, optionsSuccessStatus: 200 }));
// app.use(cors({ origin: CONFIG.API_URL, optionsSuccessStatus: 200 }));

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

const restLink = new RestLink({ uri: CONFIG.API_URL });

export const client = new ApolloClient({
  // link: new HttpLink({
  //   uri: CONFIG.API_URL,
  //   credentials: "same-origin",
  // }),
  link: restLink,
  cache,
  defaultOptions,
});

export const getApplications = async () => {
  try {
    const res = await axios({
      method: "get",
      responseType: "json",
      url: GET_APPS_URL, // CONFIG.API_URL ,// GET_APPS_URL,
    });
    console.log({ res });
    return res?.data;
  } catch (error) {
    console.log({ error });
  }
};
