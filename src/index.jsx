import React, { Fragment, useEffect, useRef, useState } from 'react'
import './autosuggest.scss'

const SuggestionItem = ({
  activeItem,
  activeItemBackground,
  data,
  inactiveItemBackground,
  onClick,
  query,
}) => {
  const getFormattedString = () => {
    const content = data.name
    const startIndex = content.toLowerCase().indexOf(query.toLowerCase())
    const endIndex = startIndex + query.length
    return (
      <Fragment>
        {query && (
          <p
            className={activeItem && 'active-item'}
            style={{
              backgroundColor: activeItem ? activeItemBackground : inactiveItemBackground,
              color: activeItem ? '#333' : '#717272'
            }}
          >
            {content.substr(0, startIndex)}
            <span className="bold">
              {content.substr(startIndex, endIndex - startIndex)}
            </span>
            {content.substr(endIndex)}
          </p>
        )}
        {!query && (
          <p
            className={activeItem && 'active-item'}
            style={{
              backgroundColor: activeItem ? activeItemBackground : inactiveItemBackground,
              color: activeItem ? '#333' : '#717272'
            }}
          >
            {content}
          </p>
        )}
      </Fragment>
    )
  }

  return (
    <div
      className="suggestion-item"
      tabIndex="0"
      onClick={() => onClick(data)}
    >
      {getFormattedString()}
    </div>
  )
}

SuggestionItem.defaultProps = {
  activeItemBackground: '#ddd',
  inactiveItemBackground: '#fff'
}

const AutoSuggest = ({
  activeItemBackground,
  data,
  enableArrowNavigation,
  inactiveItemBackground,
  inputClassName,
  onChange,
  noMatchText,
  placeholder,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState(data)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [query, setQuery] = useState('')
  const suggestionsRef = useRef(null)

  const handleOnChange = (e) => {
    const { value } = e.target
    setQuery(value)
    if (value) {
      setShowSuggestions(true)
    }
  }

  const getFilteredSuggestions = (query) => {
    const lowerCaseQuery = query.toLowerCase()
    const results = data.filter(item => {
      const lowerCaseItem = item.name.toLowerCase()
      if (lowerCaseItem.includes(lowerCaseQuery)) {
        return item
      }
    })
    return results
  }

  useEffect(() => {
    const filteredSuggestions = getFilteredSuggestions(query)
    setSuggestions(filteredSuggestions)
    setCurrentIndex(0)
  }, [query])

  useEffect(() => {
    document.addEventListener("mousedown", closeSuggestionsOnOutsideClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", closeSuggestionsOnOutsideClick);
    };
  }, [])

  const closeSuggestionsOnOutsideClick = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setShowSuggestions(false)
    }
  }

  const handleOnKeyDown = (e) => {
    console.log('e', e.key)
    const { key } = e
    if (key === 'ArrowDown' && enableArrowNavigation) {
      if (!showSuggestions) {
        setShowSuggestions(true)
      }
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setCurrentIndex(0)
      }
    } else if (key === 'ArrowUp' && enableArrowNavigation) {
      if (!showSuggestions) {
        setShowSuggestions(true)
      }
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else {
        setCurrentIndex(suggestions.length - 1)
      }
    } else if (key === 'Enter') {
      setQuery(suggestions[currentIndex].name)
      setShowSuggestions(false)
      setCurrentIndex(0)
      if (onChange instanceof Function) {
        onChange(data[currentIndex])
      }
    }
  }

  const handleOnClick = (data) => {
    setQuery(data.name)
    setShowSuggestions(false)
    if (onChange instanceof Function) {
      onChange(data)
    }
  }

  return (
    <div className="autosuggest-container">
      <input
        type="text"
        placeholder={placeholder}
        className={`autosuggest-input ${inputClassName}`}
        value={query}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      {showSuggestions && (
        <div className="suggestions-container" ref={suggestionsRef}>
          {suggestions.map((sug, index) => (
            <SuggestionItem
              query={query}
              data={sug}
              activeItem={currentIndex === index}
              onClick={handleOnClick}
              activeItemBackground={activeItemBackground}
              inactiveItemBackground={inactiveItemBackground}
            />
          ))}
          {suggestions.length === 0 && (
            <div className="no-results-found">
              {noMatchText}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

AutoSuggest.defaultProps = {
  data: [],
  activeItemBackground: '#ddd',
  inactiveItemBackground: '#fff',
  placeholder: 'Search',
  inputClassName: '',
  enableArrowNavigation: true,
  noMatchText: 'No match found!'
}

export default AutoSuggest