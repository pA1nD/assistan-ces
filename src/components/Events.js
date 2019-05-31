import React, { useContext, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import loadingIcon from "../assets/loading.svg";
import googleIcon from "../assets/google.svg";
import { kebabCase } from "lodash";
import moment from "moment";
import "moment/locale/es";
import { FirebaseContext } from "./Firebase";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #4ccef9;
`;

const InnerContainer = styled.div`
  padding: 1.5em;
  max-width: 768px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #fff;
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: 1em;
  color: #fff;
  text-align: center;
`;

const Divider1 = styled.div`
  width: 100%;
  height: 1em;
`;

const Button = styled.button`
  border: 1px solid #fadbd8;
  background-color: #fdedec;
  padding: 0.7em;
  width: 250px;
  border-radius: 3px;
  font-size: 0.9em;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.01);
  color: rgb(235, 87, 87);
  font-weight: 500;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const signInWithPopup = firebase => {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    firebase.auth().useDeviceLanguage();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const id = result.user.uid;
        const displayName = result.user.displayName;
        const email = result.user.email;
        resolve({ id, displayName, email });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        reject({ errorCode, errorMessage, email, credential });
      });
  });
};

const writeToDatabase = (database, slug, data) => {
  return new Promise((resolve, reject) => {
    database
      .ref(slug)
      .set(data)
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

const Events = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const location = window.atob(match.params.location);
  const date = window.atob(match.params.date);
  moment.locale("es");
  const formattedDate = moment(date, "DD-MM-YYYY").format("dddd D [de] MMMM");
  const database = useContext(FirebaseContext).database();

  const handleButtonClick = () => {
    signInWithPopup(firebase).then(res => {
      setLoading(true);
      const id = res.id;
      const data = {
        displayName: res.displayName,
        email: res.email
      };

      const slug = `${kebabCase(location)}/${kebabCase(date)}/volunteers/${id}/`;

      writeToDatabase(database, slug, data)
        .then(() => {
          setLoading(false);
          setCompleted(true);
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <Container>
      <InnerContainer>
        {!completed && !loading && (
          <>
            <Title>{location}</Title>
            <SubTitle>
              El {formattedDate} sumate a reindependizar el país con educación!
              <span role="img" aria-label="flexin">
                💪🇵🇾
              </span>
            </SubTitle>
            <Divider1 />
            <Button onClick={handleButtonClick}>
              {" "}
              <img
                src={googleIcon}
                width="14"
                height="14"
                alt="Google"
                style={{ marginRight: 10 }}
              />{" "}
              Continuar con Google
            </Button>
          </>
        )}
        {completed && (
          <Title>
            Se confirmo tu asistencia!{" "}
            <span role="img" aria-label="happines">
              🤙🎉🎊
            </span>
          </Title>
        )}
        {loading && (
          <img src={loadingIcon} width="100" height="100" alt="Loading" />
        )}
      </InnerContainer>
    </Container>
  );
};

export default Events;
