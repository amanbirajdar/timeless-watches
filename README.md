# Timeless Watches

A responsive luxury watch storefront with a complete browser-based shopping experience.

[![Live website](https://img.shields.io/badge/Live%20website-Visit%20store-8f5b38?style=for-the-badge)](https://amanbirajdar.github.io/timeless-watches/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20with-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://amanbirajdar.github.io/timeless-watches/)

## Live website

**[Open Timeless Watches](https://amanbirajdar.github.io/timeless-watches/)**

The site starts with the login page and works from any modern desktop or mobile browser. Since it is a static GitHub Pages application, account, cart, wishlist, newsletter, and demo order data are stored in each visitor's browser.

## Features

- Responsive luxury watch storefront for desktop, tablet, and mobile.
- Product collection featuring Rolex, Omega, TAG Heuer, Breitling, Seiko, Samsung, Apple, Hublot, and Jaeger.
- Search by product name or brand.
- Luxury, sport, classic, smart, brand, and sale filters.
- Quick-view modal with pricing, ratings, and specifications.
- Add to cart, quantity controls, remove item, clear cart, and totals.
- Buy Now flow and dedicated checkout page.
- Delivery validation with UPI, card, and cash-on-delivery options.
- Shipping calculation, order summary, generated order ID, and confirmation screen.
- Login, registration, remember-me sessions, logout, and wishlist support.
- Newsletter subscription, contact form feedback, support links, FAQ, shipping, returns, and policy links.
- Automated GitHub Pages deployment through GitHub Actions.

## Screenshots

### Storefront

![Timeless Watches storefront](home.png)

### Checkout

![Timeless Watches checkout](checkout.png)

## Technology

- HTML5 and CSS3
- Bootstrap 5 and Bootstrap Icons
- Vanilla JavaScript
- Browser `localStorage` and `sessionStorage`
- GitHub Actions and GitHub Pages

## Run locally

```text
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploy your own copy

1. Fork or clone this repository.
2. Push the project to the `main` branch.
3. Open **Settings → Pages** in GitHub.
4. Select **GitHub Actions** as the Pages source.
5. Wait for the deployment workflow to finish.

All links and product assets use relative paths, so the project works at a repository Pages URL.

## Important note

This is a fully interactive static demo. It does not process real payments, send real emails, or synchronize accounts across devices. A production store would connect checkout and authentication to a secure backend and payment provider such as Razorpay or Stripe.
