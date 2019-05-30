import React from 'react';
import styled from 'styled-components';
import img from '../assets/test.png';

const CardWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 1.5em;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06); 
  display: flex;
  flex-direction: column;
  
  
  div:nth-last-child() {
    margin-bottom: 0;
  }
`;

const CardHeader = styled.div`
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1em;
  padding-right: 1em;
`;

const Title = styled.p`
  font-size: 1em;
  margin: 0;
  color: #525252;
  font-weight: 700;
`;

const CardImg = styled.img`
  width: 100%;
  height: 15em;
  object-fit: cover;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 4em;
  display: flex;
`;

const Button = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  border-right: 1px solid rgba(0,0,0,0.03);
`;

const Card = (props) => {
  const handleClick = (res) => {
    console.log(res);
    window.location.reload();
  }
  
  return (
    <CardWrapper>
      <CardHeader>
        <Title>{props.card.title}</Title>
        <Title>{props.card.date}</Title>
      </CardHeader>
      <CardImg src={img} alt="Img" />
      <CardFooter>
        <Button onClick={() => handleClick(true)}>
          <span role="img" aria-label="Present">🤙</span>
        </Button>
        <Button onClick={() => handleClick(false)}>
          <span role="img" aria-label="Non">👎</span>
        </Button>
      </CardFooter>
    </CardWrapper>
  );
}

export default Card;