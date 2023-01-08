import { React, useState } from 'react';
import './App.css';
import Header from './components/core/nav';
import Banner from './components/core/banner';
import OrderedList from './components/core/orderList';
import { Context } from './utils/context';
function App() {
  const [shorturls, setShorturls] = useState([])
  return (
    <>
      <Header />
      <Context.Provider value={[shorturls, setShorturls]}>
        <Banner />
      </Context.Provider>
      {shorturls.length > 0 ? <OrderedList shorturls={shorturls} /> : ""}
    </>
  );
}

export default App;