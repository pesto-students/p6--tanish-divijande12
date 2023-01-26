import { connect } from 'react-redux'
import { toggleTheme } from '../utils/action'

function ThemeToggleButton(props) {
  return (
    <button onClick={props.toggleTheme}>
      Toggle Theme
    </button>
  )
}

const mapDispatchToProps = {
  toggleTheme
}

export default connect(null, mapDispatchToProps)(ThemeToggleButton)
