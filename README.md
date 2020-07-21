# RESTful-Vending-Machine

This app is similar to my vending machine repository, except this uses JavaScript an Ajax to incorporate
the app with a RESTful API

Upon initial load, your page must display as shown in the initial state.

The heading of the page should be Vending Machine with a horizontal rule beneath it
The main content area should be divided into two sections, approximately 2:1 ratio.
The loaded items should take up the left two-thirds of the screen.
The items should be displayed in bordered elements of three items per row.
Each item will display its index on the page numbered 1 to N, the product's name, its price (properly formatted), and the quantity available.
NOTE: The total number of elements may not be evenly divisible by three.
Three stacked forms, separated by horizontal rules, should take up the right third of the screen.
The first form will collect the money, allowing the addition of funds as well as its display. 
It should have an input field labeled, "Total $ In" and below 4 buttons labeled "Add Dollar", "Add Quarter", "Add Dime", and "Add Nickel".
The second form will identify the selected item, display messages, and conduct business. 
It should be comprised of two input fields labeled "Messages" and "Item:", respectively, followed by a single "Make Purchase" button.
The third form will display and dispense change. It should contain a single input item with a "Change" label followed by a "Change Return" button.
NOTE: The input fields on all three forms should be read-only and cannot be typed into. 
They should only be modified by interacting with elements and buttons, and via associated code in home.js.
Upon start-up all input fields should be empty, except the "Total $ In" which should display "0.00" and the list of items will be populated by making an "items" 
request using the REST API specification below and dynamically creating the appropriate elements.
