# React Module Navigation System

Using a json config file, build an HTML navigation menu for use in any React based website.


<a href="https://www.npmjs.com/package/flap-nav">View on npmjs.org</a>



## Builds a Navigation Object Model (NOM) from the JSON config

- the Nom is an abstract tree built from the more intuitive and user friendly json config
- the Nom tree is walked and HTML code is produced
- this package could be extended to build the navigation menu for any user interface other than HTML


## Example JSON Config:



```json
  [
    {
      "nav": [
        "weather",  
        "nyc weather"
      ],
      "title": "10 day forecast",
      "mdfile": "weather.md"
    },
    {
      "nav": [
        "weather",  
        "nyc weather",
        "storm watch"
      ],
      "title": "nyc storms",
      "mdfile": "storms.md"
    },
    {
      "nav": [
        "food",
        "cookies"
      ],
      "title": "chocolate chip cookies",
      "mdfile": "cookies.md"
    }
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
    {
      "nav": [
        "weather",  
        "nyc weather"
      ],
      "title": "10 day forecast",
      "mdfile": "weather.md"
    },
    /// etc...
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

## Future Enhancements
- replace `mdfile` entry with `url` (excuse my pending refactor)
- add top level non dropdown items so the user can add links like `Home` and `Contact` shown above (currently those are hard coded in the nav bundle)
