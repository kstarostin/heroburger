# HeroBurger

HeroBurger is a demo project of a small single-page online shop.

The menu of the shop contains several types of burgers sold both separately and as part of the menu, as well as salads, desserts and drinks. The names and descriptions of the items are stylised with superhero themes to make it more fun! :)

## Shop features

1. You can see full description and a nutrition table of each item in a modal window.
2. Items can be saved in the favorite list.
3. Single items can be added to cart.
4. The menu items contain burger as the main item and additional items. They can be configured and added to cart.
5. The list and the cart are not cleared after reopening the tab/browser.
6. The shop design is responsive and adapted for smaller screens, tablets and phones.

## Project structure

The main goal of this project was to build a small single page web site using only HTML, CSS and JavaScript.

The JavaScript code is written in OOP and MVC style. It consists of the controller, model and multiple views for each significant element of the shop front end.

The back end requests for fetching the menu items for the store are simulated in the `api.js`. The single and menu items are configured in the `data.js`.

`npm` and `Parcel` were used addtionally and for develpment purpose only, to maintain the OOP style for JavaScript code.

### Build

To start the app, use:

```
 npm run start
```

To build the code and prepare for deployment, use:

```
 npm run build
```

After that, the ready-for-deployment code is available in the folder `./dist`.

### Assets:

1. The main font is [DM Sans](https://fonts.google.com/specimen/DM+Sans).
2. Icon pack is [Phosphor Icons](https://phosphoricons.com).
3. All item pictures are generated using [Wepic AI Image Generator](https://wepik.com/ai).
4. The main logo icon is based on the [Burger mascot logo design by LAKTAPUS](https://www.freepik.com/free-vector/burger-mascot-logo-design_69439182.htm).
5. The loading spinner wheel created using [SVG Backgrounds](https://www.svgbackgrounds.com/elements/animated-svg-preloaders).
