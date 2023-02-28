(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
    typeof define === 'function' && define.amd ? define(['react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.FlapNav = factory(global.React));
})(this, (function (React) { 'use strict';

    var nom = [];

    // loop through the nom at given level to find a matching dropdown item, return a pointer to the nom element to add leaf or dropdown to
    var nomContains = function nomContains(model, navName) {
      for (var i = 0; i < model.length; i++) {
        if (model[i].type === 'dropdown' && model[i].name === navName) {
          return model[i];
        }

        // caller does the traverse down now which is probably better ...
        // else if (model[i].children !== null && Array.isArray(model[i].children)) {
        //   nomContains(model[i].children, navName)
        // }
      }

      return null;
    };
    var buildNomLeaf = function buildNomLeaf(node, spec) {
      var leaf = {
        type: 'leaf',
        name: spec.title,
        href: '/post/' + spec.mdfile.replace('.md', '')
      };
      if (node.children != null) {
        node.children.push(leaf);
      } else {
        node.children = [leaf];
      }
    };
    var buildNomDropdown = function buildNomDropdown(d, node) {
      var dropdown = {
        type: 'dropdown',
        name: d,
        children: null
      };
      if (node !== null) {
        if (node.children != null) {
          node.children.push(dropdown);
        } else {
          node.children = [dropdown];
        }
      } else {
        nom.push(dropdown);
      }
      return dropdown;
    };

    // for each nav level, create a dropdown
    // if it already exists, then move to next nav list entry
    var buildNomDropdownList = function buildNomDropdownList(nav, spec) {
      var node = null;
      var model = nom;
      nav.forEach(function (v, i) {
        var matchNode = nomContains(model, v); // does this item exist, if so add under it
        if (matchNode != null) {
          node = matchNode;
          model = matchNode.children; // recurse down 
          return; // forEach continue 
        }

        node = buildNomDropdown(v, node);
      });
      buildNomLeaf(node, spec); // at the end of the navigation tree, always comes the leaf
    };

    // from json config, build the Navigation Object Model (Nom)
    var buildNom = function buildNom(articles) {
      articles.forEach(function (d) {
        var nav = d.nav;

        // every entry starts with one, or more, dropdowns, then ends with a leaf
        buildNomDropdownList(nav, d);
      });
    };
    var nomBuilder = function nomBuilder(articles) {
      // global vars are kept in scope
      // strict mode will cause this function to be called twice, therefore, appending double leaf nodes
      // if the nom was already walked, just return it
      if (nom.length > 0) {
        return nom;
      }
      buildNom(articles);
      return nom;
    };

    var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

    var css = "/* Desktop Navigation */\n\n@media (min-width: 1280px) {\n  .flap-navbar {\n    padding: 0;\n  }\n\n  .flap-navbar ul {\n    margin: 0;\n    padding: 0;\n    display: flex;\n    list-style: none;\n    align-items: center;\n  }\n\n  .flap-navbar li {\n    position: relative;\n  }\n\n  .flap-navbar a,\n  .flap-navbar a:focus {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px 0 10px 30px;\n    font-family: 'EB Garamond', system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n    font-size: 16px;\n    font-weight: 500;\n    color: rgba(var(--color-default-rgb), 1);\n    white-space: nowrap;\n    transition: 0.3s;\n    text-decoration: none;\n  }\n\n  .flap-navbar a i,\n  .flap-navbar a:focus i {\n    font-size: 12px;\n    line-height: 0;\n    margin-left: 5px;\n    width: 15px;\n    height: 15px;\n  }\n\n  .flap-navbar a:hover,\n  .flap-navbar .active,\n  .flap-navbar .active:focus,\n  .flap-navbar li:hover>a {\n    color: inherit;\n  }\n\n  .flap-navbar .getstarted,\n  .flap-navbar .getstarted:focus {\n    background: #FFFFFF;\n    padding: 8px 20px;\n    margin-left: 30px;\n    border-radius: 4px;\n    color: #FFFFFF;\n  }\n\n  .flap-navbar .getstarted:hover,\n  .flap-navbar .getstarted:focus:hover {\n    color: #FFFFFF;\n    background: rgba(var(--color-primary-rgb), 0.8);\n  }\n\n  .flap-navbar .dropdown ul {\n    display: block;\n    position: absolute;\n    left: 14px;\n    top: calc(100% + 30px);\n    margin: 0;\n    padding: 10px 0;\n    z-index: 99;\n    opacity: 0;\n    visibility: hidden;\n    background: #FFFFFF;\n    box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);\n    transition: 0.3s;\n    border-radius: 4px;\n  }\n\n  .flap-navbar .dropdown ul li {\n    min-width: 200px;\n  }\n\n  .flap-navbar .dropdown ul a {\n    padding: 10px 20px;\n    font-size: 15px;\n    text-transform: none;\n    font-weight: 400;\n    text-decoration: none;\n  }\n\n  .flap-navbar .dropdown ul a i {\n    font-size: 12px;\n  }\n\n  .flap-navbar .dropdown ul a:hover,\n  .flap-navbar .dropdown ul .active:hover,\n  .flap-navbar .dropdown ul li:hover>a {\n    color: inherit;\n  }\n\n  .flap-navbar .dropdown:hover>ul {\n    opacity: 1;\n    top: 100%;\n    visibility: visible;\n  }\n\n  .flap-navbar .dropdown .dropdown ul {\n    top: 0;\n    left: calc(100% - 30px);\n    visibility: hidden;\n  }\n\n  .flap-navbar .dropdown .dropdown:hover>ul {\n    opacity: 1;\n    top: 0;\n    left: 100%;\n    visibility: visible;\n  }\n}\n\n@media (min-width: 1280px) and (max-width: 1366px) {\n  .flap-navbar .dropdown .dropdown ul {\n    left: -90%;\n  }\n\n  .flap-navbar .dropdown .dropdown:hover>ul {\n    left: -100%;\n  }\n}\n\n.mobile-flap-nav-toggle {\n  display: none;\n}\n\n\n/* Nav svg */\n\ni.fi-chevron-down {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E\");\n\n}\n\ni.fi-chevron-up {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'/%3E%3C/svg%3E\");\n}\n\ni.fi-list {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'/%3E%3C/svg%3E\");\n}\n\ni.fi-x {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E\");\n}\n\n/* Mobile Navigation */\n\n@media (max-width: 1279px) {\n  .flap-navbar {\n    padding: 0;\n    z-index: 9997;\n  }\n\n  .flap-navbar ul {\n    display: none;\n    position: absolute;\n    inset: 55px 15px 15px 15px;\n    padding: 10px 0;\n    margin: 0;\n    border-radius: 10px;\n    background-color: #FFFFFF;\n    overflow-y: auto;\n    transition: 0.3s;\n    z-index: 9998;\n  }\n\n  .flap-navbar a,\n  .flap-navbar a:focus {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px 20px;\n    font-family: 'EB Garamond', serif;\n    font-size: 15px;\n    font-weight: 600;\n    color: #000000;\n    white-space: nowrap;\n    transition: 0.3s;\n    text-decoration: none;\n  }\n\n  .flap-navbar a i,\n  .flap-navbar a:focus i {\n    font-size: 12px;\n    line-height: 0;\n    margin-left: 5px;\n    width: 15px;\n    height: 15px;\n  }\n\n  .flap-navbar a:hover,\n  .flap-navbar .active,\n  .flap-navbar .active:focus,\n  .flap-navbar li:hover>a {\n    color: #000000;\n  }\n\n  .flap-navbar .dropdown ul,\n  .flap-navbar .dropdown .dropdown ul {\n    position: static;\n    display: none;\n    z-index: 99;\n    padding: 10px 0;\n    margin: 10px 20px;\n    background: #FFFFFF;\n    transition: all 0.5s ease-in-out;\n    box-shadow: 0px 0px 30px rgba(0,0,0, 0.1);\n  }\n\n  .flap-navbar .dropdown>.dropdown-active,\n  .flap-navbar .dropdown .dropdown>.dropdown-active {\n    display: block;\n  }\n\n  .mobile-flap-nav-toggle {\n    display: inline-block;\n    color: var(--color-secondary);\n    font-size: 28px;\n    cursor: pointer;\n    line-height: 0;\n    transition: 0.5s;\n    width: 30px;\n    height: 30px;\n  }\n\n  .mobile-flap-nav-toggle.fi-x {\n    color: #000000;\n  }\n\n  .mobile-flap-nav-active {\n    overflow: hidden;\n  }\n\n  .mobile-flap-nav-active .mobile-flap-nav-toggle {\n    position: fixed;\n    top: 21px;\n    right: 24px;\n    z-index: 9999;\n    color: #FFFFFF;\n    width: 30px;\n    height: 30px;\n  }\n\n  .mobile-flap-nav-active .flap-navbar {\n    position: fixed;\n    overflow: hidden;\n    inset: 0;\n    background: rgba(var(--color-black-rgb), 0.6);\n    transition: 0.3s;\n  }\n\n  .mobile-flap-nav-active .flap-navbar>ul {\n    display: block;\n  }\n}";
    n(css,{});

    var FlapNav = function FlapNav(props) {
      var data = props.data;
      var nom = []; // navigation object model
      var nav = []; // navigation html

      var toggleNavMenu = function toggleNavMenu(e) {
        document.body.classList.toggle("mobile-flap-nav-active");
        e.currentTarget.classList.toggle('fi-list');
        e.currentTarget.classList.toggle('fi-x');
      };
      var toggleNavMenuItem = function toggleNavMenuItem(e) {
        if (window.innerWidth >= 1280) {
          return; // don't toggle chevron in desktop mode
        }

        e.currentTarget.classList.toggle('active');
        e.currentTarget.nextSibling.classList.toggle("dropdown-active");
        e.currentTarget.querySelector('.fi').classList.toggle("fi-chevron-down");
        e.currentTarget.querySelector('.fi').classList.toggle("fi-chevron-up");
      };
      var buildDropdown = function buildDropdown(e, children) {
        var col = buildNavColumn(children, []);
        return /*#__PURE__*/React.createElement("li", {
          "class": "dropdown"
        }, /*#__PURE__*/React.createElement("a", {
          href: "#",
          onClick: toggleNavMenuItem
        }, /*#__PURE__*/React.createElement("span", null, e.name), /*#__PURE__*/React.createElement("i", {
          "class": "fi fi-chevron-down dropdown-indicator"
        })), /*#__PURE__*/React.createElement("ul", null, col));
      };
      var buildLeaf = function buildLeaf(e) {
        return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
          href: e.href
        }, e.name));
      };

      // from the root dropdown level of a nav link, build out it's child tree structure
      var buildNavColumn = function buildNavColumn(e, col) {
        e.forEach(function (e) {
          if (e.type === 'dropdown') {
            col.push(buildDropdown(e, e.children));
          } else if (e.type === 'leaf') {
            col.push(buildLeaf(e));
          }
        });
        return col;
      };

      // translate the Nom to Html
      var buildNav = function buildNav() {
        nom = nomBuilder(data);

        // all root elements are dropdowns, so we know they have children
        nom.forEach(function (e) {
          nav.push(buildDropdown(e, e.children));
        });
        return /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
          href: "/"
        }, "Home")), nav, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
          href: "/contact"
        }, "Contact")));
      };
      return /*#__PURE__*/React.createElement("div", {
        "class": "flap-nav-container"
      }, /*#__PURE__*/React.createElement("nav", {
        id: "flap-navbar",
        "class": "flap-navbar"
      }, buildNav()), /*#__PURE__*/React.createElement("div", {
        "class": "position-relative"
      }, /*#__PURE__*/React.createElement("i", {
        "class": "fi fi-list mobile-flap-nav-toggle",
        onClick: toggleNavMenu
      })));
    };

    return FlapNav;

}));
