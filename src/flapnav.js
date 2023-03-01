import React from 'react';
import nomBuilder from './nomBuilder';
import './flapnav.css';

const FlapNav = (props) => {

  const { data } = props
  
  let nom = []; // navigation object model
  let nav = []; // navigation html

  const toggleNavMenu = (e) => {
    document.body.classList.toggle("mobile-flap-nav-active")
    e.currentTarget.classList.toggle('fi-list');
    e.currentTarget.classList.toggle('fi-x');
  };


  const toggleNavMenuItem = (e) => {
    if (window.innerWidth >= 1280) {
      return; // don't toggle chevron in desktop mode
    }
    e.currentTarget.classList.toggle('active')
    e.currentTarget.nextSibling.classList.toggle("dropdown-active")
    e.currentTarget.querySelector('.fi').classList.toggle("fi-chevron-down")
    e.currentTarget.querySelector('.fi').classList.toggle("fi-chevron-up")
  }

  const buildDropdown = (e, children) => {
    const col = buildNavColumn(children, [])

    return (
      <li class="dropdown">
        <a href="#" onClick={toggleNavMenuItem}>
          <span>{e.name}</span>
          <i class="fi fi-chevron-down dropdown-indicator"></i>
        </a>
        <ul>
          {col}
        </ul>
      </li>
    )
  }

  const buildLeaf = (e) => {
    return (
      <li>
        <a href={e.href}>{e.name}</a>
      </li>
    )
  }

  // from the root dropdown level of a nav link, build out it's child tree structure
  const buildNavColumn = (e, col) => {
    e.forEach((e) => {
      if (e.type === 'dropdown') {
        col.push(buildDropdown(e, e.children))
      } else if (e.type === 'leaf') {
        col.push(buildLeaf(e))
      }
    })
    return col
  }


  // translate the Nom to Html
  const buildNav = () => {

    nom = nomBuilder(data)

    // if root elements is a leaf, then jsut render it and move on, otherwise it's a dropdown and we know it has children
    nom.forEach((e) => {
      if (e.type === 'leaf'){
        nav.push(buildLeaf(e))
      } else {
        nav.push(buildDropdown(e, e.children))
      }      
    })

    return (
      <ul>
        {nav}
      </ul>
    )
  }


  return (
    <div class="flap-nav-container">
      <nav id="flap-navbar" class="flap-navbar">
        {buildNav()}
      </nav>
      <div class="position-relative">

        <i class="fi fi-list mobile-flap-nav-toggle" onClick={toggleNavMenu}></i>

      </div>

    </div>
  )
}

export default FlapNav;
