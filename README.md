# Dua Property Full-Stack (100% Free Stack)

This project is now a full-stack, serverless real estate app:

- Frontend: React + Vite hosted on Vercel
- API: Vercel Serverless Functions (`/api/*`)
- Database: MongoDB Atlas free tier (M0)
- Image Storage: Cloudinary free tier
- Admin Auth: JWT session in secure HttpOnly cookie

No Express server and no separate backend hosting is required.

## Architecture

1. Browser calls frontend pages (`/`, `/properties`, `/property/:id`, `/admin/*`)
2. Frontend calls Vercel serverless APIs (`/api/properties`, `/api/auth/*`)
3. APIs use a cached MongoDB connection for serverless performance
4. Admin uploads images directly to Cloudinary and stores returned URLs in MongoDB
5. Public pages fetch live property data from MongoDB through the same APIs

## Property Schema (MongoDB)

Implemented in `api/_lib/propertyModel.js`:

- `title` (string, required)
- `price` (string/number, required)
- `location` (string, required)
- `type` (enum: `1BHK`, `2BHK`, `3BHK`, `plot`, etc.)
- `images` (array of URLs)
- `description` (string)
- `createdAt` (date)

## API Routes

- `GET /api/properties` -> fetch all properties
- `POST /api/properties` -> create property (admin only)
- `PUT /api/properties/:id` -> update property (admin only)
- `DELETE /api/properties/:id` -> delete property (admin only)
- `POST /api/auth/login` -> admin login
- `POST /api/auth/logout` -> admin logout
- `GET /api/auth/me` -> validate current admin session

## Admin Panel

- `/admin/login` -> login page
- `/admin` -> dashboard

Dashboard features:

- Add property form
- Edit property form
- Delete property
- Multi-image upload via Cloudinary
- List all properties

## Environment Variables

Copy `.env.example` to `.env` and fill values.

Required:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH` (recommended) or `ADMIN_PASSWORD`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

## Local Development

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Run dev server:

```bash
npm run dev
```

## Seed Existing JSON Data

To import current listings from [src/data/properties.json](src/data/properties.json) into MongoDB:

```bash
npm run seed
```

To clear existing properties first, then re-import:

```bash
npm run seed:reset
```

Notes:

1. Ensure [.env](.env.example) values are set, especially `MONGODB_URI`.
2. The script maps legacy fields (`name`, `image_main`, `images_gallery`) to the new schema (`title`, `images`).
3. Seeding is idempotent by title + location (it updates existing records instead of creating duplicates).

## Vercel Deployment (Free)

1. Push repository to GitHub
2. Import project in Vercel (free plan)
3. Add all environment variables in Vercel project settings
4. Deploy

`vercel.json` already includes rewrite rules for SPA routes and API routes.
