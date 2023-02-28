# React Module Navigation System

Using a json config file, build an HTML navigation menu for use in any React based website.


<a href="https://www.npmjs.com/package/flap-nav"><img width="60px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAXVBMVEX///8mJiYAAAAUFBQjIyMzMzPn5+fr6+utra22trZwcHCOjo4cHBwPDw8ZGRn39/fY2NiWlpZ/f39DQ0MrKysJCQmhoaHx8fG0tLRra2vg4OC8vLyVlZV+fn52dnZtB+3aAAABb0lEQVR4nO3aXU/CMBiAUdgGfjFQBEFF///P1ISwdckaViDRwjmXXd+yJ9wwYDQCAAAAAAAAAAAAAAAAAAAAAAAAgL37okxSbA+T09TJ98PkXeJk/MinIYX1OMn6oS1Mm5w/toVpk1Hl/yqcKUynUGEvhXEKT6Dw1gurULs8oDAyeU5h/4nnFVavgUl77PHC2OSAwroIRI+8UGERbnopEwo7k2/t5PHCervY/Npv+gg2dY5czi9UuDi5cNM/ebxw/RlMPitUqFChQoUKFSpUqFChQoUKFSpUqFBh9oXh8UnfCOdSWK0Cwfr1FMZ+RrmiwgiFChUqVKhQ4R8WrqtencJd3a4n/tukFf6DNvKa3cLgQnjHX2WzPqywmvQqO+/huFmvmruIfi7tP3Cy+m4K5/07qk7hrL1Qh3e8XDXr492AwtMNerbI2qDnw6wpzJ/C/CnMn8L8KczftIi4mkIAAAAAAAAAAAAAAAAAAABuxQ+a2VKQTE1ZPQAAAABJRU5ErkJggg=="></a>



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
