import { connect } from "react-redux"
import SearchWidget from "./SearchWidget"
import { setCity } from '../../store/actions'

const mapStateToProps = (state) => {
  return {
    city: state.city
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCity: city => {
      dispatch(setCity(city))
    }
  }
}

const ConnectedSearchWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchWidget)

export default ConnectedSearchWidget