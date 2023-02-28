# React Module Navigation System

Using a json config file, build an HTML navigation menu for use in any React based website

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
  ];

```

### A picture is worth 1000 words, the above JSON will render as 

![flap nav from json](/docs/flap-nav-rendered.png)

## Future Enhancements
- replace `mdfile` entry with `url` (excuse my pending refactor)
- add top level non dropdown items so the user can add links like `Home` and `Contact` shown above (currently those are hard coded in the nav bundle)