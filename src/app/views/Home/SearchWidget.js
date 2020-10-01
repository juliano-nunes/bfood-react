import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonSecondary } from '../../style/styles'
import { getCities } from '../../repository'

const Input = styled.input`
  border: none;
  font-size: 2rem;
  padding: 15px 14px;
  width: 650px;
  border-radius: 35px;
  padding-left: 60px;
`
const InputField = styled.div`
  position: relative;
`
const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: 2rem;
  color: ${props => props.theme.primary};
  top: calc(66px/2 - 1rem);
  left: 30px;
`
const SearchComponent = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
`
const CitiesList = styled.ul`
  position: absolute;
  top: 50px;
  width: calc(100% - 70px);
  list-style: none;
  background-color: #f5f5f5;
  padding: 0;
  margin-left: 35px;
`
const CitiesListItem = styled.li`
  color: #000;
  font-size: 2rem;
  padding: 15px 10px;
  &:hover {
    background-color: #fCfCfC;
  }
`
const SearchInput = styled(Input)`
  margin-bottom: 2rem
`

export default function SearchWidget({city, setCity}) {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [controller, setController] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectItem = ({ name, id }) => {
    setSearch(name);
    setCity(id);
  };

  const listCities = (event) => {
    setSearch(event.target.value)

    if (controller) {
      controller.abort();
    }

    const abortController = new AbortController();
    setController(abortController);

    getCities(search, abortController.signal).then(res => res.json())
    .then(
      (result) => {
        setItems(result.location_suggestions.map(city => <CitiesListItem key={city.id} onClick={() => selectItem(city)}>{city.name}</CitiesListItem>));
      }
    )
  };

  const clearInput = () => {
    setSearch('');
    setCity(0);
  };

  const getResults = () => {
    return (
      city ? null : <CitiesList
        className="cities">{items}</CitiesList>
    )
  };

  return (
    <SearchComponent>
      <InputField>
        <Icon icon={faMapMarkerAlt}/>
        <SearchInput value={search} onChange={listCities}
                      onClick={clearInput}
                      placeholder="Ex. São Paulo" className="cities-input"
                      aria-label="Buscar restaurantes por Cidade"
        />
        {getResults()}
      </InputField>
      <ButtonSecondary
        to={{ pathname: `/search/${city}` }}>Search</ButtonSecondary>
    </SearchComponent>
  );
}
