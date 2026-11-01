# Portfolio – Milind Singh Chauhan

React (Vite) frontend + Node.js/Express backend (contact form).

```
portfolio/
├── client/   React + Vite  -> GitHub Pages par deploy hota hai
├── server/   Express API   -> Render/Railway par deploy (optional)
└── .github/workflows/deploy.yml
```

## 1. Local me chalao

Frontend:
```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

Backend (optional, contact form ke liye):
```bash
cd server
npm install
cp .env.example .env    # phir .env me values bharo
npm run dev             # http://localhost:5000
```
Frontend ko backend se jodne ke liye `client/.env` banao:
```
VITE_API_URL=http://localhost:5000
```
Agar `VITE_API_URL` set nahi hai, to contact form seedha tumhara mail app khol deta hai (mailto). Backend ke bina bhi sab chalta hai.

## 2. Apna content badlo

Sab kuch `client/src/data.js` me hai. Wahan do jagah `github:` aur projects ke `link:` me apne links daalo.

## 3. GitHub par daalo

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
```

## 4. GitHub Pages se deploy (frontend)

1. GitHub repo -> **Settings -> Pages -> Source: GitHub Actions** select karo.
2. `main` branch par push karte hi site live ho jayegi: `https://<USERNAME>.github.io/<REPO>/`

## 5. Backend deploy (optional)

GitHub Pages sirf static site chalata hai, isliye Express server alag deploy karo (Render free tier theek hai):

1. render.com -> New -> Web Service -> apna repo chuno
2. Root Directory: `server`, Build: `npm install`, Start: `npm start`
3. Environment variables: `CLIENT_URL` (tumhari github.io site), `SMTP_USER`, `SMTP_PASS` (Gmail App Password), `MAIL_TO`
4. Deploy hone ke baad URL milega, e.g. `https://my-api.onrender.com`
5. GitHub repo -> **Settings -> Secrets and variables -> Actions -> Variables** me `VITE_API_URL` = us URL par set karo, phir workflow dobara chalao.

Gmail App Password: Google Account -> Security -> 2-Step Verification on karo -> App passwords.
