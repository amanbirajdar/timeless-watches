# Timeless Watches

![Timeless Watches](home.png)

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
- Dedicated checkout page with:
  - Delivery details and validation.
  - UPI, card, and cash-on-delivery selection.
  - Shipping calculation.
  - Order summary and generated order ID.
  - Order confirmation screen.
- Browser-based login and registration demo.
- Remember-me sessions and logout.
- Wishlist support.
- Newsletter subscription storage.
- Contact form with success feedback.
- Social media, support, FAQ, shipping, returns, and policy links.
- GitHub Actions deployment to GitHub Pages.

## Screenshots

### Storefront

![Timeless Watches storefront](home.png)

### Checkout

![Timeless Watches checkout](checkout.png)

## Technology

- HTML5
- CSS3
- Bootstrap 5
- Bootstrap Icons
- Vanilla JavaScript
- Browser `localStorage` and `sessionStorage`
- GitHub Actions
- GitHub Pages

## Run locally

Open `index.html` directly in a browser, or use any static file server:

```text
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`. Every push to `main` can deploy the static site automatically.

The project uses relative links and asset paths, so it works at the repository Pages URL:

```text
https://amanbirajdar.github.io/timeless-watches/
```

## Storage and checkout note

Login, cart, wishlist, newsletter, and demo order data are stored in the visitor's browser using `localStorage` and `sessionStorage`. The checkout is a functional static demo flow, but it does not charge real payments or send real emails. A production store would connect the checkout to a secure backend and a payment provider such as Razorpay or Stripe.
