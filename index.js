

function ___$insertStyle(css) {
  if (!css) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

___$insertStyle(".autosuggest-container {\n  width: 100%;\n  max-width: 300px;\n}\n.autosuggest-container * {\n  box-sizing: border-box;\n}\n.autosuggest-container .autosuggest-input {\n  width: 100%;\n  height: 45px;\n  border: 1px solid #f1f1f1;\n  border-radius: 5px;\n  padding: 10px;\n  outline: none;\n  font-size: 16px;\n  font-family: \"Nunito\", sans-serif;\n  font-weight: 600;\n  color: #333;\n}\n.autosuggest-container .suggestions-container {\n  width: 100%;\n  border: 1px solid #f1f1f1;\n}\n.autosuggest-container .suggestions-container .suggestion-item {\n  border-bottom: 1px solid #f1f1f1;\n  border-collapse: collapse;\n}\n.autosuggest-container .suggestions-container .suggestion-item p {\n  font-family: inherit;\n  margin: 0;\n  padding: 10px 15px;\n  font-size: 16px;\n  color: #717272;\n  letter-spacing: 0.3px;\n}\n.autosuggest-container .suggestions-container .suggestion-item p span.bold {\n  font-weight: 800;\n  color: #000;\n}\n.autosuggest-container .suggestions-container .suggestion-item:hover p {\n  background-color: #f1f1f1;\n  font-size: 17px;\n}\n.autosuggest-container .suggestions-container .suggestion-item:last-child {\n  border-bottom: none;\n}\n.autosuggest-container .suggestions-container .no-results-found {\n  padding: 15px;\n  text-align: center;\n  font-size: 16px;\n  font-weight: bold;\n}");

const SuggestionItem = ({
  activeItem,
  activeItemBackground,
  data,
  inactiveItemBackground,
  onClick,
  query,
}) => {
  const getFormattedString = () => {
    const content = data.name;
    const startIndex = content.toLowerCase().indexOf(query.toLowerCase());
    const endIndex = startIndex + query.length;
    return (
      React.Fragment(null, [
        query && (
          React__default['default'].createElement('p', {
            className: activeItem && 'active-item',
            style: {
              backgroundColor: activeItem ? activeItemBackground : inactiveItemBackground,
              color: activeItem ? '#333' : '#717272'
            }
          }, [
            content.substr(0, startIndex),
            React__default['default'].createElement('span', {className: "bold"}, [
              content.substr(startIndex, endIndex - startIndex)
            ]),
            content.substr(endIndex)
          ])
        ),
        !query && (
          React__default['default'].createElement('p', {
            className: activeItem && 'active-item',
            style: {
              backgroundColor: activeItem ? activeItemBackground : inactiveItemBackground,
              color: activeItem ? '#333' : '#717272'
            }
          }, [
            content
          ])
        )
      ])
    )
  };

  return (
    React__default['default'].createElement('div', {
      className: "suggestion-item",
      tabIndex: "0",
      onClick: () => onClick(data)
    }, [
      getFormattedString()
    ])
  )
};

SuggestionItem.defaultProps = {
  activeItemBackground: '#ddd',
  inactiveItemBackground: '#fff'
};

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
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState(data);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const suggestionsRef = React.useRef(null);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value) {
      setShowSuggestions(true);
    }
  };

  const getFilteredSuggestions = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = data.filter(item => {
      const lowerCaseItem = item.name.toLowerCase();
      if (lowerCaseItem.includes(lowerCaseQuery)) {
        return item
      }
    });
    return results
  };

  React.useEffect(() => {
    const filteredSuggestions = getFilteredSuggestions(query);
    setSuggestions(filteredSuggestions);
    setCurrentIndex(0);
  }, [query]);

  React.useEffect(() => {
    document.addEventListener("mousedown", closeSuggestionsOnOutsideClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", closeSuggestionsOnOutsideClick);
    };
  }, []);

  const closeSuggestionsOnOutsideClick = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  const handleOnKeyDown = (e) => {
    console.log('e', e.key);
    const { key } = e;
    if (key === 'ArrowDown' && enableArrowNavigation) {
      if (!showSuggestions) {
        setShowSuggestions(true);
      }
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    } else if (key === 'ArrowUp' && enableArrowNavigation) {
      if (!showSuggestions) {
        setShowSuggestions(true);
      }
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentIndex(suggestions.length - 1);
      }
    } else if (key === 'Enter') {
      setQuery(suggestions[currentIndex].name);
      setShowSuggestions(false);
      setCurrentIndex(0);
      if (onChange instanceof Function) {
        onChange(data[currentIndex]);
      }
    }
  };

  const handleOnClick = (data) => {
    setQuery(data.name);
    setShowSuggestions(false);
    if (onChange instanceof Function) {
      onChange(data);
    }
  };

  return (
    React__default['default'].createElement('div', {className: "autosuggest-container"}, [
      React__default['default'].createElement('input', {
        type: "text",
        placeholder: placeholder,
        className: `autosuggest-input ${inputClassName}`,
        value: query,
        onChange: handleOnChange,
        onKeyDown: handleOnKeyDown}
      ),
      showSuggestions && (
        React__default['default'].createElement('div', {className: "suggestions-container", ref: suggestionsRef}, [
          suggestions.map((sug, index) => (
            SuggestionItem({
              query: query,
              data: sug,
              activeItem: currentIndex === index,
              onClick: handleOnClick,
              activeItemBackground: activeItemBackground,
              inactiveItemBackground: inactiveItemBackground}
            )
          )),
          suggestions.length === 0 && (
            React__default['default'].createElement('div', {className: "no-results-found"}, [
              noMatchText
            ])
          )
        ])
      )
    ])
  )
};

AutoSuggest.defaultProps = {
  data: [],
  activeItemBackground: '#ddd',
  inactiveItemBackground: '#fff',
  placeholder: 'Search',
  inputClassName: '',
  enableArrowNavigation: true,
  noMatchText: 'No match found!'
};

exports['default'] = AutoSuggest;
//# sourceMappingURL=index.js.map
