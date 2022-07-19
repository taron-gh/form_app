import React from 'react';
import './styles/App.css';
import AppForm from './AppForm';
import Header from './Header';

function App() {
  return (
    <div>
      <Header heading="Application" description="Please fill out your application here."/>
      <AppForm/>
    </div>
  );
}

export default App;
