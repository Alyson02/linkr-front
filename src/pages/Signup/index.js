import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../../services/api";
import swal from "sweetalert";

export default function Singup() {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);

  const [email, setEmail] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onFinish(e) {
    e.preventDefault();
    setIsDisabled(true);

    if (!email || !pictureUrl || !username || !password) {
      swal("", "Please fill in all the fields!", "error");
      return;
    }

    const obj = {
      email,
      password,
      username,
      pictureUrl,
    };

    Api.post("/signup", obj)
      .then(() => navigate("/"))
      .catch((err) => {
        if (err.response.status === 409) {
          swal("", "Email já está em uso", "error");
          setIsDisabled(false);
          return;
        }

        swal("", "Erro ao se cadastrar", "error");
        setIsDisabled(false);
      });
  }

  return (
    <>
      <Page>
        <LeftContainer>
          <h1>linkr</h1>
          <p>save, share and discover</p>
          <p>the best links on the web</p>
        </LeftContainer>
        <RightContainer>
          <RegisterForm onSubmit={onFinish}>
            <input
              data-identifier="input-email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isDisabled}
            />
            <input
              data-identifier="input-password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isDisabled}
            />
            <input
              data-identifier="input-email"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isDisabled}
            />
            <input
              data-identifier="input-email"
              type="text"
              placeholder="picture url"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              disabled={isDisabled}
            />

            <button
              data-identifier="login-btn"
              type="submit"
              disabled={isDisabled}
            >
              Sign Up
            </button>
          </RegisterForm>
          <Link data-identifier="sign-up-action" to={`/`}>
            <p>Switch back to log in</p>
          </Link>
        </RightContainer>
      </Page>
    </>
  );
}

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  background: #333333;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  width: 62.84722%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5%;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

  h1 {
    font-family: "Passion One", cursive;
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }

  p {
    font-family: "Oswald", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }

  @media (max-width: 750px) {
    width: 100%;
    height: auto;
    padding: 10px 69px 27px 69px;
    align-items: center;

    h1 {
      font-size: 76px;
      line-height: 84px;
    }

    p {
      font-size: 23px;
      line-height: 34px;
    }
  }
`;

const RightContainer = styled.div`
  height: 100vh;
  padding: 0 3.81944%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 22px;
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }

  @media (max-width: 750px) {
    height: auto;
    padding: 40px 22px 0 23px;

    p {
      margin-top: 21px;
      font-size: 17px;
      line-height: 20px;
    }
  }
`;

const RegisterForm = styled.form`
  input {
    width: 100%;
    height: 65px;
    margin-bottom: 13px;
    padding: 12px 17px 13px 17px;
    font-family: "Oswald", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    border: none;
    border-radius: 6px;
    color: #9f9f9f;
    outline: none;
  }

  input:disabled {
    color: #afafaf;
    background: #f2f2f2;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
  }

  ::placeholder {
    color: #dbdbdb;
  }

  button {
    width: 100%;
    height: 65px;
    font-family: "Oswald", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    background-color: #1877f2;
    border: none;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 750px) {
    input {
      height: 55px;
      margin-bottom: 11px;
      padding: 10px 17px 12px 17px;
      font-size: 22px;
      line-height: 33px;
    }
    button {
      height: 55px;
      padding: 11px 0;
      font-size: 22px;
      line-height: 33px;
    }
  }
`;
