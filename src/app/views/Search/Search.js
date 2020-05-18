import React from 'react'
import { Container } from '../../style/styles'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import Card from '../../shared/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { getRestaurants } from '../../repository'

const Section = styled.section`
  padding: 150px 0;
  background-color: ${props => props.theme.secondary};
`
const RestaurantsList = styled.section`
  display: flex;
  flex-wrap: wrap;
`
const SearchWrapper = styled.div`
  display: flex;
  align-items: start;
`
const Filters = styled.div`
  min-width: 350px;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
  margin: 10px;
  border-radius: 10px;
`
const FilterList = styled.ul`
  list-style: none;
  padding: 0;
  line-height: 2.5rem;
`
const StarIcon = styled(FontAwesomeIcon)`
  color: #F6C63C;
  font-size: 1.5rem;
`
const FilterOption = styled.input`
  margin-right: 10px;
  width: 1rem;
  height: 1rem;
`

class Search extends React.Component {
  constructor (props) {
    window.scrollTo(0, 0);
    const { match } = props
    super(props)
    this.state = {
      restaurants: [],
      filteredRestaurants: [],
      isLoaded: false,
      city: match.params.city,
      filters: {
        review: {
          values: [
            { value: 1, checked: false },
            { value: 2, checked: false },
            { value: 3, checked: false },
            { value: 4, checked: false },
            { value: 5, checked: false },
          ],
          rule: ({ user_rating: {aggregate_rating} }, review) => {
            return Math.floor(aggregate_rating) === review.value;
          },
        },
        cost: {
          values: [
            { min: 0, max: 50, label: 'R$ 50.00', checked: false },
            { min: 50, max: 80, label: 'R$ 50.00 a R$80.00', checked: false },
            { min: 80, max: 110, label: 'R$ 80.00 a R$110.00', checked: false },
            { min: 110, max: 999, label: 'R$ 110.00 or more', checked: false },
          ],
          rule: ({average_cost_for_two}, cost) => {
            return average_cost_for_two >= cost.min && average_cost_for_two < cost.max;
          },
        },
      },
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.getFilterCheckboxes = this.getFilterCheckboxes.bind(this)
  }

  buildRestaurantCard ({ name, id, location: { address }, user_rating: { aggregate_rating } }) {
    return (
      <Card name={name} value={this.getStars(Math.floor(aggregate_rating))}
            description={address} path="/" key={id}/>)
  }

  getStars (number) {
    const stars = new Array(number)
    for (var i = 0; i < number; i++) {
      stars.push(<StarIcon icon={faStar} key={i}/>)
    }
    return (
      <span>{stars}</span>
    )
  }

  getFilterCheckboxes (filterName) {
    return (
      this.state.filters[filterName].values.map(
        (filter, index) =>
          <li key={`filter-${filterName}-${index}`}>
            <FilterOption type="checkbox" name={filterName} onChange={(evt) => this.handleFilterChange(index, evt)}/>
            {filterName === 'review' ? this.getStars(filter.value) : filter.label}
          </li>
      )
    )
  }

  componentDidMount () {
    getRestaurants(this.state.city).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            restaurants: result.restaurants,
            filteredRestaurants: result.restaurants
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        },
      )
  }

  handleFilterChange (index, {target: {name , checked}}) {
    const changedFilter = this.state.filters[name];
    changedFilter.values[index].checked = checked;

    //updating just updated filter
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        changedFilter
      }
    }));

    const filteredByReview = this.applyFilter(this.state.restaurants, this.state.filters.review);
    const filteredByCost = this.applyFilter(this.state.restaurants, this.state.filters.cost);

    if (!filteredByReview.optionsApplied.length && !filteredByCost.optionsApplied.length) {
      this.setState({filteredRestaurants: this.state.restaurants});
      this.forceUpdate();
      return;
    }

    const uniqueRestaurants = new Set([...filteredByReview.restaurants, ...filteredByCost.restaurants].flat(1));
    this.setState({filteredRestaurants: [...uniqueRestaurants]});
    this.forceUpdate();
  }

  applyFilter(restaurants, filter) {
    const selectedOptions = filter.values.filter(option => option.checked)

    const filteredRestaurants = [];
    selectedOptions.forEach(review => {
      filteredRestaurants.push(restaurants.filter(({restaurant}) => filter.rule(restaurant, review)))
    })

    return {optionsApplied: selectedOptions, restaurants: filteredRestaurants};
  }

  render () {
    return (
      <Section>
        <Container>
          <h1>Results For: </h1>
          <SearchWrapper>
            <Filters>
              <h3>Note</h3>
              <FilterList>
                {this.getFilterCheckboxes('review')}
              </FilterList>

              <h3>Cost</h3>
              <FilterList>
                {this.getFilterCheckboxes('cost')}
              </FilterList>
            </Filters>

            <RestaurantsList>
              {this.state.filteredRestaurants.map(({restaurant}) => this.buildRestaurantCard(restaurant))}
            </RestaurantsList>
          </SearchWrapper>

        </Container>
      </Section>
    )
  }
}

export default withRouter(Search)