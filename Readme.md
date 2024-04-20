<p align="center">
  <img src="/img/hero-burger-logo.png" alt="Hero Burger logo"/>
</p>

**Hero Burger** is a demo project of a small single-page online shop.

The menu of the shop contains several types of burgers sold both separately and as part of the configurable menu, as well as fingerfood, salads, desserts and drinks. The names and descriptions of the items are stylised with superhero themes to make it more fun! :)

Visit the shop at [heroburger.netlify.app](https://heroburger.netlify.app/).

## Shop features

1. In the modal window, you can see the full description and nutrition table of each item.
2. Items can be saved in the favourites list.
3. You can add single items to the basket.
4. Menu items contain a burger as the main item and additional mandatory or optional items to choose from. A menu item can be configured and added to the basket.
5. The favourites list and basket are saved in the browser storage and remain unchanged when the tab/browser is reopened.
6. You can place an order from the basket. The delivery address can be saved for the future orders.
7. The website design is responsive and adapted for small screens, tablets and phones.

## Project structure

The main goal of this project was to build a small single page website using only **HTML**, **CSS** and **JavaScript**.

The JavaScript code is written in OOP style and using MVC architecture. It consists of a controller, a model and several views for each significant element of the shop page.

The back-end requests to retrieve shop menu items are simulated in the `api.js`. The single and the menu items are configured in the `data.js`.

`npm` and `Parcel` were used addtionally and for develpment purpose only, to maintain the OOP style of the JavaScript code.

### Build

Navigate to the project root and install the project dependencies with the command:

```
 npm install
```

To start the app, use:

```
 npm start
```

To build the code and prepare for deployment, use:

```
 npm run build
```

> #### Note
>
> To run both `start` and `build` commands on Windows, you will need some command line with bash feature installed.

After that, the ready-for-deployment code is available in the folder `./dist`.

### Assets

1. The prime font of the website is [DM Sans](https://fonts.google.com/specimen/DM+Sans).
2. For the site icons, I used [Phosphor Icons](https://phosphoricons.com).
3. All item pictures were generated using [Wepic AI Image Generator](https://wepik.com/ai).
4. The site logo icon is based on the [Burger mascot logo design by LAKTAPUS](https://www.freepik.com/free-vector/burger-mascot-logo-design_69439182.htm).
5. The loading spinner was created using [SVG Backgrounds](https://www.svgbackgrounds.com/elements/animated-svg-preloaders).
