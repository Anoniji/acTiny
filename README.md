```
           _____ _             
  __ _  __/__   (_)_ __  _   _ 
 / _` |/ __|/ /\/ | '_ \| | | |
| (_| | (__/ /  | | | | | |_| |
 \__,_|\___\/   |_|_| |_|\__, |
                         |___/ 
```
acTiny is a lightweight JavaScript library that provides a variety of utility functions for manipulating the DOM, making Fetch requests, adding animations, and more. It aims to simplify common web development tasks and improve code readability.

# Required
- Animate 4.1.1 - https://animate.style/

# Informations
- On the other hand, the animate.css file must be imported before the latter to be able to use it

# Getting Started

1. Include the acTiny library in your HTML file:
```HTML
<script type="text/javascript" src="path/to/acTiny.js"></script>
```

2. Access the library functions
Use the $ shortcut to interact with acTiny's methods:

```JavaScript
$(selector).method(arguments);
```

# Available Functions

## DOM Manipulation

- **html(content):** Sets or retrieves the inner HTML content of an element.
- **text(content):** Sets or retrieves the text content of an element.
- **val(content):** Sets or retrieves the value of form elements (input, textarea, select).
- **after(element, content):** Inserts an element after the target element.
- **before(element, content):** Inserts an element before the target element.
- **prepend(content):** Inserts content at the beginning of the target element.
- **append(content):** Inserts content at the end of the target element.
- **empty():** Removes all child elements from the target element.
- **attr(attribute, value):** Sets or retrieves an attribute of the target element.
- **removeAttr(attribute):** Removes an attribute from the target element.
- **addClass(className):** Adds a CSS class to the target element.
- **removeClass(className):** Removes a CSS class from the target element.
- **toggleClass(className):** Toggles a CSS class on the target element.
- **hasClass(className):** Checks if the target element has a specific CSS class.
- **css():** Returns an object containing all the computed CSS styles of the target element.
- **position():** Returns an object containing the x and y coordinates of the target element relative to the viewport.
- **width():** Returns the width of the target element in pixels.
- **height():** Returns the height of the target element in pixels.
- **prop(property, value):** Sets or retrieves a property of the target element.
- **parent():** Returns the parent element of the target element.
- **find(selector):** Returns an array of elements matching the provided selector within the target element.
- **eq(index):** Returns the element at the specified index within the target element's children (similar to jQuery's eq()).

## Events

- **click(function):** Attaches a click event listener to the target element.
- **dblclick(function):** Attaches a double-click event listener to the target element.
- **keydown(function):** Attaches a keydown event listener to the target element.
- **keyup(function):** Attaches a keyup event listener to the target element.
- **keypress(function):** Attaches a keypress event listener to the target element.
- **change(function):** Attaches a change event listener to the target element (for form elements).
- **submit(function):** Attaches a submit event listener to a form element.
- **hover(function):** Attaches mouseenter and mouseleave event listeners for hover behavior.
- **on(event, function):** Attaches a generic event listener to the target element (supports events listed in eventList).
- **off(event, function):** Removes an event listener from the target element.

## Animations

- **effect(effectName, duration, delay):** Applies an animation effect to the target element (supports effects listed in effectList).
- **animate(animationName, duration, delay):** Applies an animation from Animate.css library to the target element (supports animations listed in animateList).
- **show(duration, delay):** Fades in the target element with animation (optional duration and delay).
- **hide(duration, delay):** Fades out the target element with animation (optional duration and delay).
- **fadeIn(direction, duration, delay):** Fades in the target element with optional direction (Up, Down, Left, Right, etc.) and animation (optional duration and delay).
- **fadeOut(direction, duration, delay):** Fades out the target element with optional direction (Up, Down, Left, Right, etc.) and animation (optional duration and delay).
- **slideUp(direction, duration, delay):** Slides the target element up with animation (optional direction, duration, and delay).
- **slideDown(direction, duration, delay):** Slides the target element down with animation (optional direction, duration, and delay).
- **scrollTop(behavior):** Return the scrollbar to the top of the page (optional behavior).
- **scrollTo(behavior):** Allows you to position the scrollbar at the location of a specific element (optional behavior).

## Interactive Elements

- **draggable():** Makes the target element draggable.
- **resizable():** Makes the target element resizable.
- **autocomplete(data, callback):** Implements an autocomplete feature for input elements, suggesting matches from the provided data array.
- **button(text, callback):** Creates a button element with the specified text and optional callback function for click events.
- **dialog(title, content, buttonText, closeOnClickOverlay):** Creates a modal dialog with the specified title, content, button text, and optional behavior to close on overlay click.
- **menu():** Adds hover behavior to a menu, revealing submenus on hover.
- **progressbar(value):** Creates a progress bar and sets its value (between 0 and 100).
- **slider(min, max, value):** Creates a slider input element with the specified minimum, maximum, and initial value.
- **tabs(defaultTab):** Implements tabbed navigation functionality.
- **tooltip(text, hideOnScroll):** Creates a tooltip that displays the specified text when hovering over the target element and optionally hides when scrolling.
- **transcript(language, startButtonText, stopButtonText, placeholderText):** Enables speech-to-text transcription, allowing users to speak and see the text displayed in a designated input field.

## Fetch Requests

- **get(url, data, headers):** Sends a GET request to the specified URL, optionally with data and headers.
- **post(url, data, headers):** Sends a POST request to the specified URL, optionally with data and headers.
- **put(url, data, headers):** Sends a PUT request to the specified URL, optionally with data and headers.
- **delete(url, data, headers):** Sends a DELETE request to the specified URL, optionally with data and headers.
- **options(url, data, headers):** Sends an OPTIONS request to the specified URL, optionally with data and headers.
- **getJSON(url, data, headers):** Sends a GET request and parses the JSON response.
- **postJSON(url, data, headers):** Sends a POST request and parses the JSON response.
- **putJSON(url, data, headers):** Sends a PUT request and parses the JSON response.
- **deleteJSON(url, data, headers):** Sends a DELETE request and parses the JSON response.
- **optionsJSON(url, data, headers):** Sends an OPTIONS request and parses the JSON response.

## Utility Functions

- **delay(milliseconds):** Returns a promise that resolves after the specified number of milliseconds.
- **infiniscrool(fetchFunction, data):** Enables infinite scrolling, loading more content as the user scrolls to the bottom of the page.
- **toast(message, type, direction, duration, delay):** Creates a dismissible toast notification with customizable message, type, direction, and timing.
- **translator(lang, dict, attr):** Translates elements with data-i18n attribute based on language and dictionary, observing for new elements.

# Additional Notes

To use acTiny's fetch functions, ensure the fetch API is available in your browser environment. You may need to include a polyfill for older browsers.
For animations that use the Animate.css library, make sure to include the Animate.css stylesheet in your HTML document.

# Example Usage

```JavaScript
// Fade in an element on page load
$(document).ready(function() {
    $("#myElement").fadeIn(2000);
});

// Make an element draggable
$("#draggableElement").draggable();

// Send a GET request and display the response
$.get("https://api.example.com/data/").then(data => {
    $("#myGet").html(data);
});

// Create a tabbed interface
$("#myTabs").tabs("tab_1");

// Enable infinite scrolling for a container
$("#infiniscroolElement").infiniscrool($.get, ["https://api.example.com/data/"]);
```
