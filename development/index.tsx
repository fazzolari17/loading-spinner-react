import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Advanced
} from '../src';
import { Main } from '../development/props';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
    <Advanced size={100} displayText={true} textColor='red' textAnimation={true}/>
  </React.StrictMode>
);
