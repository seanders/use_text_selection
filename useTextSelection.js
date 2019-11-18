import { useRef, useState, useEffect } from "react";

const debounce = (fn, debounceTime) => {
  // debounced function
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), debounceTime);
  };
};

const noop = () => null;

const getClientRectsForSelection = selection => {
  // Netscape originally added support for multiple ranges. Currently, only Gecko-based browsers actually offer
  // support for multiple ranges. Practically speaking, there is only one range possible on document at one point at time.
  // See: https://www.w3.org/TR/selection-api/#h_note_15
  const range = selection.getRangeAt(0)
  const rect = range.getClientRects();
  return rect;
}

export default function useTextSelection(debounceMs, selectionCb = noop) {
  const [selectionText, setSelectionText] = useState("");
  const selectionObject = useRef(null)
  const selectionRects = useRef(null);
  // const [selectionObject, setSelectionObject] = useState(null);

  const debouncedSetSelection = debounce(selection => {
    // Saving the selection object in state was breaking after 2 renders...?
    selectionObject.current = selection;
    selectionRects.current = getClientRectsForSelection(selection);
    setSelectionText(selection.toString());
  }, 400);

  function handleSelectionChange(event) {
    const selection = document.getSelection();

    selectionCb(selection);
    debouncedSetSelection(selection);
  }

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [selectionCb]);

  return [selectionText, selectionObject.current, selectionRects.current];
}
