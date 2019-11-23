import { useRef, useState, useEffect } from "react";
import debounce from "./debounce";

// TODOs: certain methods trigger layout/paints like `getBoundingClientRect`
// Investigate if theres some performance optimizations we can make here.
// Look at how `FastDOM` handles this. Multiple invocations of this hook would trigger
// `n` number of paints/layout. Calculating the rect of the selection needs to only
// occur once. Need to memoize this value across instances of this hook.

const noop = () => null;

function nodeContainsSelectedText(node, selection, partialContainment = true) {
  return selection.containsNode(node, partialContainment);
}

const getClientRectForSelection = selection => {
  // Netscape originally added support for multiple ranges. Currently, only Gecko-based browsers actually offer
  // support for multiple ranges. Practically speaking, there is only one range possible on document at one point at time.
  // See: https://www.w3.org/TR/selection-api/#h_note_15
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  return rect;
};

export default function useTextSelection({
  debounceMs = 0,
  selectionCb = noop,
  selectOnMouseUp = false
}) {
  const [selectionText, setSelectionText] = useState("");
  // Keep track of when selection is 'done' based on mouse up event
  const [selectionDone, setSelectionDone] = useState(false);
  const watchedNode = useRef(null);
  const selectionObject = useRef(null);
  const selectionRects = useRef(null);

  const _setSelection = selection => {
    if (selection === null) {
      selectionObject.current = null;
      selectionRects.current = null;
      setSelectionText(null);
      return;
    }

    // Saving the selection object in state was breaking after 2 renders...?
    selectionObject.current = selection;
    selectionRects.current = getClientRectForSelection(selection);
    setSelectionText(selection.toString());
  };

  // If debounce is 0, assume this means the user wants synchronous execution
  const setSelectedText =
    debounceMs <= 0 ? _setSelection : debounce(_setSelection, debounceMs);

  function handleSelectionChange(event) {
    const selection = document.getSelection();
    const nodeContainsSelection = nodeContainsSelectedText(
      watchedNode.current || document,
      selection
    );

    if (nodeContainsSelection) {
      selectionCb(selection);
      setSelectedText(selection);
    } else {
      // clear values when selection is outside the node we're concerned with
      selectionCb(selection);
      setSelectedText(null);
    }
  }

  function handleMouseUp() {
    setSelectionDone(true)
  }

  function handleMouseDown() {
    setSelectionDone(false);
  }

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [selectionCb, watchedNode.current]);

  let textReturnValue;

  if (selectOnMouseUp) {
    textReturnValue = selectionDone ? selectionText : null;
  } else {
    textReturnValue = selectionText;
  }

  return [
    textReturnValue,
    selectionObject.current,
    selectionRects.current,
    watchedNode
  ];
}
