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
      {/* <Page pageNumber="3" /> */}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

function Page({ pageNumber }) {
  const [selectedText, selectionObject, selectionRects] = useTextSelection(400);

  console.group('selectionActions')

  console.log('selectedText', selectedText);
  console.log("selectionObject", selectionObject);
  console.log("selectionRects", selectionRects);
  console.groupEnd('selectionActions')


  return (
    <div>
      <h4>Page Number: {pageNumber}</h4>
      <p>
        single-origin coffee actually flexitarian XOXO distillery tousled cray
        food truck McSweeney's Thundercats banjo synth beard authentic viral
        semiotics plaid selfies gluten-free Marfa banh mi PBR retro 8-bit iPhone
        bespoke wayfarers fap bicycle rights Odd Future salvia Blue Bottle
        biodiesel asymmetrical mustache blog brunch put a bird on it pork belly
        pop-up vegan Wes Anderson literally sartorial locavore drinking vinegar
        polaroid occupy direct trade yr tofu quinoa kale chips photo booth
        Neutra sriracha 3 wolf moon cliche High Life fingerstache pickled
        disrupt keffiyeh Kickstarter deep v swag sustainable Tonx DIY small
        batch dreamcatcher ugh paleo street art shabby chic cardigan gastropub
        Helvetica raw denim Carles Intelligentsia Shoreditch selvage tattooed
        mixtape hoodie bitters artisan Truffaut mlkshk craft beer organic
        aesthetic mumblecore chia pug Pinterest stumptown kogi meh tote bag
        Schlitz cornhole roof party 90's ennui fashion axe fanny pack PBR&B
        Austin VHS before
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('react-target'))
