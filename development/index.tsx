import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Advanced
} from '../src';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Advanced size={100} displayText={true} textColor='red' textAnimation={true}/>
  </React.StrictMode>
);
