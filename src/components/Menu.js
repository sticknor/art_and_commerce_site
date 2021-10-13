// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Shell from './../assets/shell.png';

export default function Menu(props) {
  const { onClose, onOpen, open, color, shopClient, categories } = props;

  return (
    <>
      {/* Menu button (shell) */}
      <div className="menu-button" onClick={open ? onClose : onOpen}>
        <img src={Shell} alt="Menu" />
        <div className="menu-button-text">Menu</div>
      </div>

      {/* Menu content */}
      <div
        className={`menu ${open ? 'menu-open' : 'menu-closed'}`}
        style={{
          background: `${color}`,
          background: `linear-gradient(90deg,${color} 0%,${color} 72%,transparent 100%)`,
        }}
      >
        <div className="menu-content">
          {Object.keys(categories || {}).map((category) => {
            return (
              <div className="menu-link">
                <Link to={`/collection/${category}`}>{category}</Link>
              </div>
            );
          })}
          <div className="menu-divider" />
          <div className="menu-link">archive</div>
          <div className="menu-link">runway</div>
          <div className="menu-divider" />
          <div className="menu-link">about</div>
          <div className="menu-link">contact</div>
        </div>
      </div>
      {/* Menu cancel area */}
      {open && <div className={'menuCancelArea'} onClick={onClose} />}
    </>
  );
}
