# Fastor Restaurants (React Developer Task)

A mobile-first React app where a user logs in with their phone number and OTP, then browses a list of restaurants.

## Features

- Phone number + OTP login
- JWT token stored in `localStorage`
- Protected route (restaurants page opens only after login)
- Restaurant list with "Load more" pagination
- Form validation, loading spinners and error toasts
- Logout

## Tech Stack

- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

## App Flow

```
Login page  ->  Verify OTP page  ->  Restaurants page
(enter phone)   (enter OTP)          (needs token)
```

1. **Login page**: the user enters a 10 digit phone number. The app calls the register API, which sends an OTP.
2. **Verify OTP page**: the user enters the 6 digit OTP. The app calls the login API, which verifies the OTP and returns a JWT token. The token is saved and the user is redirected.
3. **Restaurants page**: the app calls the restaurant API with the token in the `Authorization` header and shows the results.

> The register API only sends an OTP (it takes just `phone` and `dial_code`), and the login API verifies it. So both live in one phone + OTP flow instead of a separate register form.

## API Endpoints

Base URL: `https://staging.fastor.ai`

| Step | Method | Endpoint | Used in |
|---|---|---|---|
| Register and get OTP | POST | `/v1/pwa/user/register` | `sendOtp()` in `Login.jsx` |
| Login with OTP | POST | `/v1/pwa/user/login` | `verifyOtp()` in `VerifyOtp.jsx` |
| Fetch restaurants | GET | `/v1/m/restaurant?city_id=118` | `fetchRestaurants()` in `Restaurants.jsx` |

Register and login send `application/x-www-form-urlencoded` data. The restaurant API needs a Bearer token.

## Folder Structure

```
src/
  api/
    client.js            Axios instance, adds token to every request
    auth.js              sendOtp and verifyOtp calls
    restaurants.js       fetchRestaurants call
  context/
    AuthContext.jsx      Stores token, provides login and logout
  components/
    ProtectedRoute.jsx   Redirects to /login if not logged in
    Header.jsx           Top bar with logout button
    RestaurantCard.jsx   Single restaurant card
    Spinner.jsx          Loading indicator
  pages/
    Login.jsx            Phone number screen
    VerifyOtp.jsx        OTP screen
    Restaurants.jsx      Restaurant list screen
  utils/
    getErrorMessage.js   Reads a readable message from API errors
  App.jsx                Routes
  main.jsx               App entry, wraps Router and AuthProvider
  index.css              Tailwind import
```

## How It Works

- **Token handling**: after OTP verification, the token is saved in `localStorage` and in `AuthContext`. The Axios interceptor in `client.js` adds it to every request. On a 401 response, the token is cleared and the user is sent to `/login`.
- **Route protection**: `ProtectedRoute` checks `isAuthenticated` and redirects to `/login` when there is no token.
- **Error handling**: every API call is wrapped in `try/catch/finally`, with a loading state and a toast message on failure.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create the env file
cp .env

# 3. Start the dev server
npm run dev
```

`.env`:

```
VITE_API_URL=https://staging.fastor.ai
```

Test OTP on the staging server: `123456`

## Note on Design

The Figma link shared with the task was not accessible (file not found for my account), so the UI is a clean mobile-first design built with Tailwind, based on the Postman API flow. It can be adjusted quickly once the design is available.