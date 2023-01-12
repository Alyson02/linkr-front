import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { UserImage } from "./UserImage";
import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";
import { Api } from "../services/api";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useWindowDimensions from "./GetWindowDimensions";
import { AuthContext } from "../contexts/auth";

function UserSearch({ user, setUsers }) {
  return (
    <UserSearchContainer>
      <Link to={`/user/${user.id}`}>
        <div onClick={() => setUsers([])}>
          <img src={user.pictureUrl} alt="user"/>
          <span>{user.username}</span>
        </div>
      </Link>
    </UserSearchContainer>
  );
}

function Result({ users, setUsers }) {
  return (
    <ResultContainer>
      {users.map((u) => (
        <UserSearch user={u} setUsers={setUsers} key={u.id} />
      ))}
    </ResultContainer>
  );
}

export default function TopBar() {
  const [users, setUsers] = useState([]);
  const [clickedOn, setClickedOn] = useState(false);
  let nameSearched = "";
  const window = useWindowDimensions();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const { setUser } = useContext(AuthContext);

  function logout() {
    setUser({});
    localStorage.clear();
    navigate("/");
  }

  function clickedOnIt() {
    const click = !clickedOn;
    setClickedOn(click);
  }

  async function search(value) {
    try {
      const res = (await Api.get(`/user/search/${value}`)).data;
      setUsers(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <TopBarContainer>
        <div>
          <Link to="/timeline">linkr</Link>
          {window.width > 937 ? (
            <InputContainer>
              <DebounceInput
                minLength={3}
                debounceTimeout={300}
                placeholder="Search for people"
                onChange={(e) => {
                  nameSearched = e.target.value;
                  if (nameSearched.length > 0) {
                    search(nameSearched);
                  } else {
                    setUsers([]);
                  }
                }}
              />
              <Result users={users} setUsers={setUsers} />
              <AiOutlineSearch size={25} color="#C6C6C6" />
            </InputContainer>
          ) : (
            ""
          )}
          <ProfileContainer>
            <button onClick={() => clickedOnIt()}>
              {clickedOn ? (
                <IoIosArrowUp color="white" size={25} />
              ) : (
                <IoIosArrowDown color="white" size={25} />
              )}
            </button>
            <UserImage
              src={auth.user?.user?.pictureUrl}
              onClick={() => setClickedOn(!clickedOn)}
            />
          </ProfileContainer>
        </div>
        {window.width <= 937 ? (
          <InputContainer>
            <DebounceInput
              minLength={3}
              debounceTimeout={300}
              placeholder="Search for people"
              onChange={(e) => {
                nameSearched = e.target.value;
                if (nameSearched.length > 0) {
                  search(nameSearched);
                } else {
                  setUsers([]);
                }
              }}
            />
            <Result users={users} />
            <AiOutlineSearch size={25} color="#C6C6C6" />
          </InputContainer>
        ) : (
          ""
        )}
      </TopBarContainer>
      <LogoutButton clickedOn={clickedOn} onClick={() => logout()}>
        <p>Logout</p>
      </LogoutButton>
    </>
  );
}

const TopBarContainer = styled.div`
  z-index: 100;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  background-color: black;
  height: 72px;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 937px) {
    height: 144px;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    font-family: "Passion One", cursive;
    color: white;
    font-size: 49px;
    font-weight: 700;
    text-decoration: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
  width: 40vw;
  background-color: white;
  border-radius: 8px;
  cursor: text;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  position: relative;
  border-top: solid 1px white;

  @media (max-width: 937px) {
    width: 100%;
  }

  input {
    display: flex;
    align-items: center;
    width: calc(40vw - 45px);
    height: 45px;
    border-radius: 8px;
    border: none;
    padding: 0 0.7vw;
    font-size: 19px;
    color: #c6c6c6;
    font-family: "Lato";
  }

  input:focus {
    box-shadow: 0;
    outline: 0;
  }

  input::placeholder {
    color: #c6c6c6;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85px;
  height: 72px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  position: fixed;
  top: 54px;
  left: 1;
  z-index: -1;
  border-radius: 0 0 8px 8px;
  background-color: #e7e7e7;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 937px) {
    top: 113px;
    width: calc(100% - 40px);
    box-sizing: border-box;
  }
`;

const UserSearchContainer = styled.div`
  padding: 10px;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img {
    border-radius: 26.5px;
    width: 40px;
    height: 40px;
    object-fit: cover;

    @media (max-width: 937px) {
      width: 30px;
      height: 30px;
    }
  }

  span {
    font-size: 19px;
    font-weight: 400;
    font-family: "Lato";
    color: #515151;
  }

  a {
    text-decoration: none;
  }
`;

const LogoutButton = styled.button`
  position: fixed;
  width: 150px;
  height: 47px;
  top: 72px;
  right: -17px;
  display: ${(props) => (props.clickedOn ? "absolute" : "none")};
  background: #171717;
  border: none;
  text-align: center;
  border-radius: 0px 0px 20px 20px;
  cursor: pointer;

  p {
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    margin-right: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }
`;
