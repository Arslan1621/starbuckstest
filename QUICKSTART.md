# Quick Start Guide - Blog Feature

## Prerequisites

- Node.js 18+ and pnpm installed
- Neon PostgreSQL database account
- Your Neon database credentials

## Setup Steps

### 1. Configure Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Neon database URL:

```
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Database

```bash
export DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
pnpm run db:push
```

Or use the setup script:

```bash
export DATABASE_URL="your_database_url"
./scripts/setup-db.sh
```

### 4. Start Development Server

```bash
pnpm run dev
```

The application will be available at `http://localhost:5000`

## Accessing the Features

### Public Blog
- **Blog Listing**: http://localhost:5000/blogs
- **Individual Post**: http://localhost:5000/blog/post-slug

### Admin Dashboard
- **Admin Panel**: http://localhost:5000/admin

## Creating Your First Blog Post

1. Go to http://localhost:5000/admin
2. Click "New Post" tab
3. Fill in the form:
   - **Title**: "My First Blog Post"
   - **Content**: Write your content
   - **Cover Image**: (optional) Add an image URL
   - **Publish**: Toggle to publish immediately
4. (Optional) Add SEO tags in the SEO tab
5. Click "Create Post"

Your post will now appear on the blog page!

## Project Structure

```
starbucks_calculator/
├── client/                 # React frontend
│   └── src/
│       ├── pages/
│       │   ├── Blogs.tsx
│       │   ├── BlogPost.tsx
│       │   └── AdminDashboard.tsx
│       ├── components/
│       │   └── BlogForm.tsx
│       └── hooks/
│           ├── usePosts.ts
│           └── usePostMutation.ts
├── server/                 # Express backend
│   ├── index.ts
│   ├── routes.ts
│   ├── db.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/                 # Shared code
│   └── schema.ts           # Database schema
├── .env.example            # Environment template
├── BLOG_FEATURE.md         # Full documentation
└── QUICKSTART.md           # This file
```

## Available Scripts

```bash
# Development
pnpm run dev              # Start dev server

# Build
pnpm run build            # Build for production
pnpm run start            # Start production server

# Database
pnpm run db:push          # Push schema to database
pnpm run db:generate      # Generate migrations

# Code quality
pnpm run check            # Type check
pnpm run format           # Format code with Prettier
```

## API Endpoints

### Public
- `GET /api/posts` - List all posts
- `GET /api/posts/:slug` - Get specific post

### Admin (No auth currently)
- `POST /api/posts` - Create post
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Common Issues

### "DATABASE_URL not set"
```bash
export DATABASE_URL="your_database_url"
```

### "Connection refused"
- Check your database is running
- Verify DATABASE_URL is correct
- Check network connectivity

### "Posts not showing"
- Ensure posts are published (toggle in form)
- Check browser console for errors
- Verify database has data

## Next Steps

1. **Add Authentication**: Protect admin routes
2. **Customize Design**: Modify CSS and components
3. **Add Features**: Categories, tags, comments, etc.
4. **Deploy**: Deploy to Vercel, Railway, or your hosting

## Documentation

For detailed information, see:
- [BLOG_FEATURE.md](./BLOG_FEATURE.md) - Complete feature documentation
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Neon Docs](https://neon.tech/docs/) - Database provider

## Support

If you encounter issues:
1. Check the error message in console
2. Review [BLOG_FEATURE.md](./BLOG_FEATURE.md) troubleshooting section
3. Check environment variables are set correctly
4. Verify database connection

Happy blogging! 🚀
