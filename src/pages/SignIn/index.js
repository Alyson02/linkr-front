import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);

  const user = {
    email: email,
    password: password,
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      navigate(`/timeline`);
    }
  }, []);

  function loginSuccess(data) {
    console.log(data);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(data));
    navigate(`/timeline`);
  }

  function loginFail(error) {
    if (error.response.status === 422) {
      alert("ERROR: Please fill in all the fields!");
    }
    if (error.response.status === 401) {
      alert("ERROR: Email or password incorrect! Please try again!");
    }
    setIsDisabled(false);
  }

  function loginUser(event) {
    event.preventDefault();
    setIsDisabled(true);
    const request = axios.post("https://linkr-ipaw.onrender.com/signin", user);
    request.then((r) => loginSuccess(r.data));
    request.catch((error) => loginFail(error));
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
          <LoginForm onSubmit={loginUser}>
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
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isDisabled}
            />
            <button
              data-identifier="login-btn"
              type="submit"
              disabled={isDisabled}
            >
              Log In
            </button>
          </LoginForm>
          <Link data-identifier="sign-up-action" to={`/signup`}>
            <p>First time? Create an account!</p>
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

    @media(max-width: 937px) {
        flex-direction: column;
    }
`;

const LeftContainer = styled.div`
  width: 62.84722%;
  height: 100vh;
  padding-top: 20.90277%;
  padding-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

    @media(max-width: 937px) {
        width: 100%;
        height: 13.11844077961019%;
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
  padding: 22.01388% 3.81944% 30.55% 3.54166%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

    @media(max-width: 937px) {
        height: 0;
        padding: 40px 22px 0 23px;

    p {
      margin-top: 21px;
      font-size: 17px;
      line-height: 20px;
    }
  }
`;

const LoginForm = styled.form`
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

    @media(max-width: 937px) {
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
