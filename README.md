# react-autosuggest-ui
Autosuggest Component for React

## How to Install

Make sure you have [Node.js](http://nodejs.org/) and NPM installed.

```sh
npm install react-autosuggest-ui
```

Or

```sh
yarn add react-autosuggest-ui
```

## How to Use

```sh
import React from 'react'
import AutoSuggest from 'react-autosuggest-ui'

const data = [
    {
        name: 'React.JS',
        value: 'React.JS'
    },{
        name: 'Vue.JS',
        value: 'Vue.JS'
    },
        {
        name: 'Angular.JS',
        value: 'Angular.JS'
    },{
        name: 'JavaScript',
        value: 'JavaScript'
    }
]

const AutoSuggestDemo = () => {
  const handleOnChange = (selected) => {
    console.log('selected', selected)
  }

  return (
    <AutoSuggest
      data={data}
      onChange={handleOnChange}
      placeholder="Search"
    />
  )
}
```

## Demo

![Autosuggest Demo](https://github.com/Santhosh1392/react-autosuggest-ui/blob/main/demo/demo.gif)

Check out [Online Demo](https://korimi.in/projects) here.

## Available PropTypes

| Prop Name    | Type     | Default Value | Description                                             |
| ------------ | -------- | ------------- | ------------------------------------------------------- |
| activeItemBackground | String   | '#ddd'            | Background color for selcted item                             |
| data       | Array   | []  | Data from where suggestions will show                       |
| enableArrowNavigation      | Boolean     |  true         | Ability to select suggestions using arrows         |
| inactiveItemBackground      | String     |  '#fff'         | Background color for inactive item           |
| onChange     | Function | null          | Callback function to get the selected value              | 
| placeholder  | String   | 'Search'  | Placeholder to display on input                         |
| inputClassName | String | ''        | Classname to input for custom styling                   |
| noMatchText   | String  | 'No match found! | Text to display on empty suggestions             |
