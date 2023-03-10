# React Module Navigation System


React responsive navigation menu.  The simplest configuration, easy to use.

With a JSON config file, build an HTML navigation menu for use in any React based website.  No more editing HTML or nested jsx code when your navigation menu items change.  Instead, edit the intuitive JSON config.  


[![Package Version](https://img.shields.io/npm/v/flap-nav.svg)](https://www.npmjs.com/package/flap-nav)
[![License](https://img.shields.io/github/license/danwfreeman/flap-nav)](https://github.com/danwfreeman/flap-nav/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/flap-nav.svg)](http://npm-stat.com/charts.html?package=flap-nav&author=&from=02-23-2023&to=)



## Benefits:
- Quickly make changes to the normalized, non-verbose JSON, focus on your content and not code syntax
- Because of the uniquely designed structure of the JSON config, adding/changing navigation menu items is intitive and faster than the tradional positional, parent-child stucture, which involves a tedious restructing of nodes.  No other system is this simple and flexible.
- And no, ChatGPT will not come up with this!  :)
- Fully responsive for all tablet and mobile device viewports

## Functional Details
- Builds a Navigation Object Model (NOM) from the JSON config
- The Nom is an abstract tree built from the more intuitive, user friendly, JSON config
- The Nom tree is recursively walked and HTML code is produced
- Additional abstraction layer - leverage the NOM to extend this system to render a navigation menu for platforms other than web


## Example JSON Config:


```javascript
  [
    {
      "nav": [],  // empty nav structure denotes root link nav item (rather than a dropdown)
      "title": "Home",
      "href": "/"
    },
    {
      "nav": [  // nav list, denotes respective number of levels of dropdowns
        "weather",  
        "nyc weather"
      ],
      "title": "10 day forecast",  // title is the name of the final link with associated href
      "href": "https://weather.com"  // can be any valid href value
    },
    {
      "nav": [
        "weather",  
        "nyc weather",
        "storm watch"
      ],
      "title": "nyc storms",
      "href": "/post/storms.html"
    },
    {
      "nav": [
        "food",
        "cookies"
      ],
      "title": "chocolate chip cookies",
      "href": "/post/cookies.html"
    }
    {
      "nav": [],  
      "title": "Contact",
      "href": "/contact"
    },    
  ]

```

### A picture is worth 1000 words, the above JSON will render as 

![flap nav from json](/docs/flap-nav-rendered.png)

### And equivalent responsive mobile view

![mobile flap nav from json](/docs/flap-nav-mobile-rendered.png)


## Installation

Install `flap-nav` with your favorite package manager.

```shell
npm i flap-nav
```

## Usage

`flap-nav` exports a React component by default for easy JSX composition:

ES6-style usage:

```javascript
import {FlapNav} from 'flap-nav';


const data = require('../data/data.json');

// or declare your data in your jsx directly

const navData = [
  {
    // ...
    {
      "nav": [   
        "weather",  
        "nyc weather"
      ],
      "title": "10 day forecast",  
      "href": "https://weather.com" 
    },
    // etc...
  }
]

const Header = (props) => {

  return (
    <header id="header" className="flex stretch">
      <div>
        <FlapNav data={data} />
      </div>
    </header>
  );

}

```



## Demo
- see `flap-nav` in action at Freebird's [blog site](https://ironbirdlife.org)



## For usage with React Native

```javascript
import {NomBuilder} from 'flap-nav';

const data = require('../data/data.json');

// Abstract tree of your navigation model, iterate over to build iOS or Android menu systems, for example with React Native
// Or, for use with any Node app.
// See flapnav.js for a recursive pattern to iterate over your Nom and build your menu
const myNavNom = NomBuilder(data); 
```

[link-license]: ./blob/master/LICENSE
[link-npm]: https://www.npmjs.com/package/flap-nav
