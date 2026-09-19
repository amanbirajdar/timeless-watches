# Timeless Watches

![Timeless Watches product collection](https://raw.githubusercontent.com/amanbirajdar/timeless-watches/main/rolex-submariner.jpg)

**Timeless Watches** is a responsive luxury watch storefront built with HTML, CSS, and vanilla JavaScript. It is designed as a GitHub Pages-ready static site, so it can run without a server or database.

## Live website

Visit the deployed project:

**[https://amanbirajdar.github.io/timeless-watches/](https://amanbirajdar.github.io/timeless-watches/)**

## Project features

- Responsive luxury watch storefront for desktop, tablet, and mobile.
- Product collection with Rolex, Omega, TAG Heuer, Breitling, Seiko, Samsung, Apple, Hublot, and Jaeger watches.
- Product search by name or brand.
- Category filters for luxury, sport, classic, and smart watches.
- Brand shortcuts and sale-only product filtering.
- Quick-view product modal with pricing, ratings, and specifications.
- Add to cart, quantity controls, remove item, clear cart, and cart total calculation.
- Buy Now flow that takes a product directly to checkout.
- Dedicated checkout page with delivery validation, UPI/card/COD selection, shipping calculation, order summary, generated order ID, and confirmation.
- Browser-based login and registration demo, remember-me sessions, logout, and wishlist support.
- Newsletter subscription, contact form feedback, social links, support, FAQ, shipping, returns, and policy links.
- GitHub Actions deployment to GitHub Pages.

## Real watch gallery

These are the real product photos used by the storefront:

| Rolex Submariner | Omega Speedmaster |
| --- | --- |
| ![Rolex Submariner](https://raw.githubusercontent.com/amanbirajdar/timeless-watches/main/rolex-submariner.jpg) | ![Omega Speedmaster](https://raw.githubusercontent.com/amanbirajdar/timeless-watches/main/omega-speedmaster.jpg) |

| Breitling Navitimer | Seiko Presage |
| --- | --- |
| ![Breitling Navitimer](https://raw.githubusercontent.com/amanbirajdar/timeless-watches/main/breitling-navitimer.jpg) | ![Seiko Presage](https://raw.githubusercontent.com/amanbirajdar/timeless-watches/main/seiko-presage.jpg) |

## Interface previews

![Timeless Watches storefront preview](https://raw.githubusercontent.com/amanbirajdar/timeless-watches/main/home.png)
![Timeless Watches checkout preview](https://raw.githubusercontent.com/amanbirajdar/timeless-watches/main/checkout.png)

## Technology

- HTML5, CSS3, Bootstrap 5, Bootstrap Icons
- Vanilla JavaScript for search, filters, cart, wishlist, login, and checkout
- Browser `localStorage` and `sessionStorage`
- GitHub Actions and GitHub Pages

## Run locally

```text
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Every push to `main` can deploy the static site automatically.

## Storage and checkout note

Login, cart, wishlist, newsletter, and demo order data are stored in the visitor's browser using `localStorage` and `sessionStorage`. Checkout is a functional static demo flow; it does not charge real payments or send real emails. A production store would connect it to a secure backend and a payment provider such as Razorpay or Stripe.
