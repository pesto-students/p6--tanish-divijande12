import { Component } from 'react'
import { connect } from 'react-redux'
import ThemeToggleButton from './components/home'
import './App.css';

function App(props) {
  return (
    <div className={`app ${props.theme}`}>
      <ThemeToggleButton />
      {/* Other components go here */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { theme: state.theme }
}

export default connect(mapStateToProps)(App)
