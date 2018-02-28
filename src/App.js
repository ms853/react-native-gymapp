/**
 * https://github.com/facebook/react-native
 * 
 * This is my root component which renders all the UI components
 *  and the reducers for redux!
 */

import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RouterNav from './RouterNav';


class App extends Component {
  
  componentWillMount() {
    
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCeyG2qvKTRi2N-QDrMO3mbBG6lvmDOo4U",
      authDomain: "gym-application-firebase.firebaseapp.com",
      databaseURL: "https://gym-application-firebase.firebaseio.com",
      projectId: "gym-application-firebase",
      storageBucket: "gym-application-firebase.appspot.com",
      messagingSenderId: "822925665706"
    };

  
     !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();     
   
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={ store }>
          <RouterNav />           
        
      </Provider>
    );
  }
}

export default App;
