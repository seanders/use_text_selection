import React from 'react'
import ReactDOM from 'react-dom'
import useTextSelection from './useTextSelection.js'
const debounce = (fn, debounceTime) => {
  // debounced function
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(null, args), debounceTime)
  }
}

const handleClick = debounce((event) => console.log('clicked button', event), 1000)

function App() {
  return (
    <div>
      <h2>Page One</h2>
      <Page pageNumber="1" />
      <Page pageNumber="2" />
      <Page pageNumber="3" />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

function Page({ pageNumber }) {
  const [selectedText, selectionObject, selectionRect, ref] = useTextSelection(400);

  console.groupCollapsed("selectionActions");
  console.log('Page: ', pageNumber)
  console.log('selectedText', selectedText);
  console.log("selectionObject", selectionObject);
  console.log("selectionRect", selectionRect);
  console.groupEnd('selectionActions')


  return (
    <div>
      <h4>Page Number: {pageNumber}</h4>
      <p ref={ref}>
        single-origin coffee actually flexitarian XOXO distillery tousled cray
        food truck McSweeney's Thundercats banjo synth beard authentic viral
        semiotics plaid selfies gluten-free Marfa banh mi PBR retro 8-bit iPhone
        bespoke wayfarers fap bicycle rights Odd Future salvia Blue Bottle
        biodiesel asymmetrical mustache blog brunch put a bird on it pork
        Austin VHS before
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('react-target'))
