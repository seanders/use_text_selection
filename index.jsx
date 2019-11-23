import React from "react";
import ReactDOM from "react-dom";
import useTextSelection from "./useTextSelection.js";
const debounce = (fn, debounceTime) => {
  // debounced function
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), debounceTime);
  };
};

const handleClick = debounce(
  event => console.log("clicked button", event),
  1000
);

function App() {
  const [selectedText, selectionObject, selectionRect, ref] = useTextSelection({
    selectOnMouseUp: true
  });

  const hasSelectedText = selectedText && selectedText.length > 0;

  return (
    <div>
      <h2>Text Sections</h2>
      <Section sectionNumber="1" />
      <Section sectionNumber="2" />
      <Section sectionNumber="3" />
      {hasSelectedText ? <HighlightedTextArea rect={selectionRect} /> : null}
      <div>Selected text:</div>
      <div>{selectedText && selectedText.toString()}</div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

function Section({ sectionNumber }) {
  const [selectedText, selectionObject, selectionRect, ref] = useTextSelection({
    selectOnMouseUp: true
  });

  // console.groupCollapsed("selectionActions - ", sectionNumber);
  // console.log("selectedText", selectedText);
  // console.log("selectionObject", selectionObject);
  // console.log("selectionRect", selectionRect);
  // console.groupEnd("selectionActions");

  const hasSelectedText = selectedText && selectedText.length > 0;
  const colorsMap = {
    1: "darkslategray",
    2: "green",
    3: "blue",
  }

  return (
    <div>
      <h4>Section Number: {sectionNumber}</h4>
      <p
        ref={ref}
        /* style={{ backgroundColor: hasSelectedText ? colorsMap[sectionNumber] : null }} */
      >
        single-origin coffee actually flexitarian XOXO distillery tousled cray
        food truck McSweeney's Thundercats banjo synth beard authentic viral
        semiotics plaid selfies gluten-free Marfa banh mi PBR retro 8-bit iPhone
        bespoke wayfarers fap bicycle rights Odd Future salvia Blue Bottle
        biodiesel asymmetrical mustache blog brunch put a bird on it pork Austin
        VHS before
      </p>
    </div>
  );
}

const HighlightedTextArea = ({
  rect: { bottom, top, left, right, height, width }
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom,
        top,
        left,
        right,
        height,
        width,
        border: '2px dashed red',
        pointerEvents: 'none'
      }}
    ></div>
  );
};

ReactDOM.render(<App />, document.getElementById("react-target"));
