// components/Header.js
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,  faXmark,  faPaw,  faGear,} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";

function Header() {
  // reducer
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // inscription
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  // connexion
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  // modale
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIslogin] = useState(true);

  //* INSCRIPTION
  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({username: signUpUsername, token: data.token}));
          setSignUpUsername("");
          setSignUpEmail("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
        console.log(data);
      });
  };

  //* CONNEXION
  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({username: signInUsername, token: data.token}));
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
        console.log(data);
      });
  };

  //* DECONNEXION
  const handleLogout = () => {
    dispatch(logout());
  };
  let logoutBnt;
  if (user.token) {
    logoutBnt = (
      <div>
        <button onClick={() => handleLogout()}>Déconnexion</button>
      </div>
    );
  }

  //* TOGGLE DE LA MODALE
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  //* TOGGLE FORMULAIRE
  const toggleForm = () => {
    setIslogin(!isLogin);
  };

  //* CONTENU MODALE
  let modalContent;
  modalContent = (
    <div className="flex border-t justify-center mt-2">
      {isLogin ? (
        <div className=" flex flex-col items-center m-5 ">
          <p className="mb-2">Se connecter</p>
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button
            className="cursor-pointer w-full border rounded-full text-red-800"
            id="connection"
            onClick={() => handleConnection()}
          >
            Connexion
          </button>
          <div className="mt-4">
            <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
              Pas encore inscrits ?
            </span>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col items-center m-5 ">
          <p className="mb-2">S'inscrire</p>
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="text"
            placeholder="E-mail"
            id="signUpEmail"
            onChange={(e) => setSignUpEmail(e.target.value)}
            value={signUpEmail}
          />
          <input
            className="w-full text-center px-16 py-1 border rounded-md focus:outline-none focus:border-blue-400 block mb-2"
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <button
            className="cursor-pointer w-full border rounded-full text-red-800"
            id="register"
            onClick={() => handleRegister()}
          >
            <span onClick={toggleForm}>Inscription</span>
          </button>
        </div>
      )}
    </div>
  );

  //* ICONES TOGGLE
  let userSection;
  if (isModalVisible) {
    userSection = (
      <FontAwesomeIcon icon={faXmark} onClick={() => showModal()} />
    );
  } else {
    let userSpan;
    if (user.token) {
      userSpan = <div>{username}</div>
    }
    userSection = (
      <div className="flex">
        <div className="mr-5 ">{logoutBnt}</div>
        <div>
          <FontAwesomeIcon icon={faUser} onClick={() => showModal()} />
        </div>
      </div>
    );
  }
  
  let username = "";
  if (user.username) {
    username = user.username;
    console.log("Utilisateur", username);
  }

  return (
    <div className="max-h-screen">
      <div className="max-h-1/5 h-[44px] flex items-center justify-between mx-10 ">
        <div className="flex gap-3">
          <Link href="/">
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faPaw} />
            </div>
          </Link>
          {username} {/* AFFICHAGE DU USERNAME */}
        </div>
        <Link href="/modalTrial">
          <div className="cursor-pointer">
            <p>Next page</p>
          </div>
        </Link>
        <Link href="/modalTrial">
          <div className="cursor-pointer">
            <FontAwesomeIcon icon={faGear} />
          </div>
        </Link>
        {userSection}
      </div>
      <div className="">{isModalVisible && modalContent}</div>
    </div>
  );
}
export default Header;
