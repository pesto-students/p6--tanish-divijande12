import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { incrementStep } from './utils/action';

function App() {
  const step = useSelector((state) => state.step)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Step: {step}</h1>
      <button onClick={() => dispatch(incrementStep())}>Increment</button>
    </div>
  );
}

export default App;
