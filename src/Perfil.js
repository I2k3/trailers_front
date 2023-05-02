import React from 'react';
import './Perfil.css';
import Foto from './foto.jpeg';

function Perfil() {
    return (
      <div className="profile">
        <img src={Foto} alt="Foto" className="avatar" />
        <div className="profile-text">
          <h1>Itzel Karina Fernandez Rios </h1>
          <h2>Ingenieria de software</h2>
          <h2>S20006763</h2>
        </div>
      </div>
    );
  }
  export default Perfil;