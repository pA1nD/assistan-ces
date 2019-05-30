import React from 'react';
import styled from 'styled-components';
import curve from '../assets/curve.svg';
import Card from './Card';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Curve = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #fff;
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const CardList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const events = [
  {
    id: 1,
    title: 'Loma San Jerónimo',
    date: 'Dom 17/03',
    img: null
  },
  {
    id: 2,
    title: 'Cateura',
    date: 'Dom 19/03',
    img: null
  },
  {
    id: 3,
    title: 'Cateura',
    date: 'Dom 19/03',
    img: null
  }
];

const Events = () => {
  return (
    <>
      <Curve src={curve} alt={"Curva"} />
      <Container>
        <Title>Eventos</Title>
        <CardList>
          {events.map((card) => {
            return <Card card={card} key={card.id} />
          })}  
        </CardList>
      </Container>
    </>
  );
}

export default Events;