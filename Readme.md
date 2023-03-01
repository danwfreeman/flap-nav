# React Module Navigation System


Using a json config file, build an HTML navigation menu for use in any React based website.


[![Package Version](https://img.shields.io/npm/v/flap-nav.svg)](https://www.npmjs.com/package/flap-nav)
[![License](https://img.shields.io/github/license/danwfreeman/flap-nav)](https://github.com/danwfreeman/flap-nav/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/flap-nav.svg)](http://npm-stat.com/charts.html?package=flap-nav&author=&from=&to=)


## Builds a Navigation Object Model (NOM) from the JSON config

- the Nom is an abstract tree built from the more intuitive and user friendly json config
- the Nom tree is walked and HTML code is produced
- this package could be extended to build the navigation menu for any user interface other than HTML
- fully responsive for all tablet and mobile device viewports


## Example JSON Config:



```json
  [
    {
      "nav": [],  // empty nav structure denotes root link nav item (rather than a dropdown)
      "title": "Home",
      "href": "/"
    },
    {
      "nav": [   // nav list, denotes respective number of levels of dropdowns
        "weather",  
        "nyc weather"
      ],
      "title": "10 day forecast",  // title is the name of the final link with assoicated href
      "href": "https://weather.com" // can be any valid href value
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



## Installation

Install `flap-nav` with your favorite package manager.

```shell
npm i flap-nav
```

## Usage

`flap-nav` exports a React component by default for easy JSX composition:

ES6-style usage:

```jsx
import FlapNav from 'flap-nav';


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
    <header id="header" class="flex stretch">
      <div>
        <FlapNav data={data} />
      </div>
    </header>
  );

}

```

## Demo
- see `flap-nav` in action at Freebird's [blog site](https://ironbirdlife.org)


[link-license]: ./blob/master/LICENSE
[link-npm]: https://www.npmjs.com/package/flap-nav