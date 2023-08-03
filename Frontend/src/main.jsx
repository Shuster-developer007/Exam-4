import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client"


// styles
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'



const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

// Toast
import { ToastContainer } from "react-toastify";


//  Router
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Router>
      <React.StrictMode>
        <App />
        <ToastContainer theme='colored' />
      </React.StrictMode>
    </Router>
  </ApolloProvider>,
)
