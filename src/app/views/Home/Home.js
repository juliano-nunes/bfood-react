import React from 'react'
import styled from 'styled-components'
import { ButtonPrimary, Container } from '../../style/styles'
import SearchWidgetComponent from './SearchWidget'
import CardComponent from '../../shared/Card'

const Section = styled.section`
  min-height: 800px;
`
const SectionPromotional = styled(Section)`
  min-height: 600px;
  padding: 100px 0;
  color: #fff;
  background-image: url("/home-background.webp");
  background-position: right;
  background-repeat: no-repeat;
  background-color: rgba(24,20,21,0.99);
`
const PromotionalWrapper = styled.div`
  width: 600px;
  padding: 100px 0;
`
const SectionMainProduct = styled(Section)`
  color: ${props => props.theme.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("/food-background1.webp");
`
const MainProductContainer = styled(Container)`
  display: flex;
`
const SectionSearch = styled(Section)`
  background-color: ${props => props.theme.primary};
  color: #fff;
  padding-top: 100px; 
`
const SearchWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const SectionPackages = styled(Section)`
  display: flex;
  color: ${props => props.theme.primary};
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-image: url("/food-background2.webp");
`
const PackageList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
`
const BurgerImage = styled.img`
  border-radius: 50%
`
export default function Home() {
    return (
      <div>
        <SectionPromotional>
          <Container>
            <PromotionalWrapper>
              <h2>Get Cashback up to 50%</h2>
              <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse
                consectur justo eu nunc consequat.</h3>
              <ButtonPrimary to="/">Order Now</ButtonPrimary>
            </PromotionalWrapper>
          </Container>
        </SectionPromotional>
        <SectionMainProduct>
          <MainProductContainer>
            <div>
              <h2>Big Burger</h2>
              <h3>Lorem ipsum dolor sit amet, consectetur, adispicing elit.
                Vivamus
                lacinia odio vitae vestibulum vestibulum.</h3>
              <ButtonPrimary to="/">Order Now</ButtonPrimary>
            </div>
            <BurgerImage src="/hamburger-photo.webp" loading="lazy" alt=""/>
          </MainProductContainer>
        </SectionMainProduct>
        <SectionSearch>
          <SearchWrapper>
            <h2>Search the Best Burguers</h2>
            <h3>Lorem ipsum dolor sit amet, consectetur, adispicing elit.
              Vivamus
              lacinia odio vitae vestibulum vestibulum.</h3>
            <SearchWidgetComponent/>
          </SearchWrapper>
        </SectionSearch>
        <SectionPackages>
          <Container>
            <h2>Popular Package</h2>
            <PackageList>
              <CardComponent name="Package 1" value="$ 10.00" description="Lorem ipsum dolor sit amet, consectetur adispicing elit." path="/" />
              <CardComponent name="Package 1" value="$ 10.00" description="Lorem ipsum dolor sit amet, consectetur adispicing elit." path="/" />
              <CardComponent name="Package 1" value="$ 10.00" description="Lorem ipsum dolor sit amet, consectetur adispicing elit." path="/" />
            </PackageList>
          </Container>
        </SectionPackages>
      </div>
    )
}
