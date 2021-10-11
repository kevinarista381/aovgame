import React from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.min.css'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error'
import Mainmenu from './components/Mainmenu';



function App() {
 
  return (
    
    
    <div className="App">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      
      
        <div>
        
          
            <Mainmenu/>            

          
        </div>

    </div>
  );
}

export default App;
