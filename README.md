# Timeless Watches

A static luxury watch storefront built with HTML, CSS, and JavaScript. It includes a browser-based cart and checkout flow in `buy.html`.

## Run locally

Open `index.html` directly in a browser, or use any static file server:

```text
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a GitHub repository and upload the project files, including `index.html`, `login.html`, `app.js`, `style.css`, `images/`, and `.github/workflows/deploy-pages.yml`.
2. Push the files to the repository's `main` branch.
3. In **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Wait for the **Deploy static site to GitHub Pages** workflow to finish.

The site uses relative links and asset paths, so it works both at a local URL and at a repository URL such as:

```text
https://<username>.github.io/<repository>/
```

Login, cart, wishlist, newsletter, and demo order data are stored in the visitor's browser with `localStorage`; no server or database is required. Checkout is a static demo flow and does not process real payments.
