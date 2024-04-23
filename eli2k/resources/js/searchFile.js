// Get the form element with class 'f1'
const form = document.querySelector('.f1');
// Listen for form submission event
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Get the search string from the input element with class 't1'
  const searchString = event.target.querySelector('.t1').value.trim();
  // If search string is not empty, search for it
  if(searchString) {
    findString(searchString);
  }
});
// Function to search for a string in the current document
function findString(str) {
  // If the user is using a browser that does not support window.find, do nothing
  if(parseInt(navigator.appVersion) < 4) return;
  let strFound = false;
  // Use window.find to search for the string in the current document
  if(window.find) {
    strFound = window.find(str);
    // Workaround for Firefox bug where window.find does not work properly
    if(strFound && !window.getSelection().anchorNode) {
      strFound = window.find(str);
    }
  }
  // If the string is not found using window.find, try using another method depending on the browser
  if(!strFound) {
    while(window.find(str, 0, 1)) {
      continue;
    }
  } else if(navigator.appName.indexOf("Microsoft") != -1) {
    let TRange = null;
    if(window.getSelection) {
      const sel = window.getSelection();
      if(sel.rangeCount > 0) {
        TRange = sel.getRangeAt(0);
      }
    } else if(document.selection) {
      TRange = document.selection.createRange();
    }
    strFound = TRange.findText(str);
    if(strFound) {
      TRange.select();
    }
  } else if(navigator.appName == "Opera") {
    // Alert the user if they are using an unsupported browser
    alert("Opera browsers not supported, sorry...");
    return;
  }
  // If the string is still not found, alert the user
  if(!strFound) {
    alert(`String '${str}' not found!`);
  }
}