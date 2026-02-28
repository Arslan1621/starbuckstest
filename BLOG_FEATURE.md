# Blog Feature Documentation

## Overview

The Starbucks Calculator project now includes a complete blog system with an admin dashboard for managing blog posts. The blog is powered by Neon PostgreSQL and includes comprehensive SEO optimization features.

## Features

### Public Blog Pages

1. **Blogs Listing Page** (`/blogs`)
   - Display all published blog posts in a grid layout
   - Show post title, excerpt, cover image, and publication date
   - Responsive design for mobile and desktop
   - Loading states and error handling

2. **Individual Blog Post Page** (`/blog/:slug`)
   - Full blog post content display
   - Automatic meta tag injection for SEO
   - Open Graph tags for social media sharing
   - Article schema markup for rich snippets
   - Related post navigation

### Admin Dashboard

1. **Admin Dashboard** (`/admin`)
   - View all blog posts (published and drafts)
   - Create new blog posts
   - Edit existing posts
   - Delete posts with confirmation dialog
   - Manage post status (published/draft)

2. **Blog Post Form**
   - Three-tab interface: Content, SEO, and Schema
   - **Content Tab:**
     - Title and auto-generated slug
     - Excerpt for post preview
     - Rich content editor
     - Cover image URL
     - Publish toggle

   - **SEO Tab:**
     - Meta title (50-60 characters recommended)
     - Meta description (150-160 characters recommended)
     - Meta robots directive (index, follow, etc.)
     - Open Graph tags for social sharing:
       - OG Title
       - OG Description
       - OG Image
       - OG Type

   - **Schema Tab:**
     - JSON-LD Article schema
     - Custom structured data support
     - Pre-formatted template included

## Database Schema

### Posts Table

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  meta_title TEXT,
  meta_description TEXT,
  meta_robots TEXT DEFAULT 'index, follow',
  og_tags JSONB,
  article_schema JSONB
);
```

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the project root with your Neon database URL:

```bash
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2. Database Migration

The database schema has already been created using Drizzle Kit. If you need to re-run migrations:

```bash
export DATABASE_URL="your_database_url"
pnpm run db:push
```

### 3. Install Dependencies

All required dependencies have been installed:
- `pg` - PostgreSQL client
- `drizzle-orm` - ORM for database operations
- `@neondatabase/serverless` - Neon serverless driver
- `drizzle-kit` - Database migration tool

### 4. Start Development Server

```bash
pnpm run dev
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Public Endpoints

- **GET** `/api/posts` - Get all published posts
- **GET** `/api/posts/:slug` - Get a specific post by slug

### Admin Endpoints

- **POST** `/api/posts` - Create a new post
- **PATCH** `/api/posts/:id` - Update an existing post
- **DELETE** `/api/posts/:id` - Delete a post

## File Structure

```
client/src/
├── pages/
│   ├── Blogs.tsx           # Blog listing page
│   ├── BlogPost.tsx        # Individual blog post page
│   └── AdminDashboard.tsx  # Admin dashboard
├── components/
│   └── BlogForm.tsx        # Blog post form component
└── hooks/
    ├── usePosts.ts         # Hook for fetching posts
    └── usePostMutation.ts  # Hook for creating/updating/deleting posts

server/
├── db.ts                   # Database connection
├── storage.ts              # Database operations
└── routes.ts               # API routes

shared/
└── schema.ts               # Drizzle schema definitions
```

## SEO Features

### 1. Meta Tags
- **Meta Title**: Customizable title for search engine results
- **Meta Description**: Customizable description for search engine results
- **Meta Robots**: Control indexing behavior (index, follow, noindex, nofollow)

### 2. Open Graph Tags
- **og:title** - Title for social media sharing
- **og:description** - Description for social media sharing
- **og:image** - Image for social media sharing
- **og:type** - Content type (article, website, etc.)

### 3. Article Schema (JSON-LD)
- Structured data for search engines
- Rich snippet support
- Customizable schema fields:
  - Headline
  - Description
  - Image
  - Author
  - Date Published
  - Date Modified

### 4. Automatic Meta Tag Injection
The BlogPost component automatically injects all meta tags and schema markup into the document head when a post is loaded.

## Usage Examples

### Creating a Blog Post

1. Navigate to `/admin`
2. Click "New Post" or go to the "New Post" tab
3. Fill in the Content tab:
   - Enter a title (slug will auto-generate)
   - Write your post content
   - Add an excerpt (optional)
   - Upload a cover image (optional)
4. Fill in the SEO tab:
   - Add meta title and description
   - Configure meta robots
   - Add Open Graph tags
5. Fill in the Schema tab (optional):
   - Add JSON-LD Article schema
6. Click "Create Post"

### Publishing a Post

- Toggle the "Publish this post" switch in the Content tab before creating/updating
- Published posts will appear on the `/blogs` page

### Editing a Post

1. Navigate to `/admin`
2. Find the post in the list
3. Click the edit icon
4. Make your changes
5. Click "Update Post"

### Deleting a Post

1. Navigate to `/admin`
2. Find the post in the list
3. Click the delete icon
4. Confirm the deletion

## Security Considerations

⚠️ **Important**: The current implementation does not include authentication. Before deploying to production:

1. **Add Authentication**: Implement user authentication for the admin dashboard
2. **Protect Routes**: Add middleware to protect admin routes
3. **Validate Input**: Implement server-side validation for all inputs
4. **Rate Limiting**: Add rate limiting to API endpoints
5. **CORS**: Configure CORS appropriately for your domain

Example authentication middleware:

```typescript
// server/middleware/auth.ts
import type { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // Implement your authentication logic here
  // Check JWT token, session, etc.
  if (!isAuthenticated(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
```

Then apply it to admin routes:

```typescript
app.post("/api/posts", requireAuth, async (req, res) => {
  // Create post
});
```

## Troubleshooting

### Database Connection Issues

If you get connection errors:

1. Verify your `DATABASE_URL` is correct
2. Check that your Neon database is active
3. Ensure SSL mode is set to `require`
4. Test connection with: `psql <DATABASE_URL>`

### Posts Not Appearing

1. Ensure posts are marked as "published"
2. Check browser console for API errors
3. Verify database has posts: `SELECT * FROM posts;`

### Meta Tags Not Updating

1. Check browser DevTools for meta tags in `<head>`
2. Verify post has `metaTitle` and `metaDescription` set
3. Clear browser cache and reload

### Slug Conflicts

Slugs must be unique. If you get a slug conflict:
1. Modify the post title to generate a different slug
2. Or manually edit the slug field

## Performance Optimization

### Caching

Consider implementing caching for frequently accessed posts:

```typescript
// server/storage.ts
const postCache = new Map<string, Post>();

async getPostBySlug(slug: string): Promise<Post | undefined> {
  if (postCache.has(slug)) {
    return postCache.get(slug);
  }
  
  const post = await db.select().from(posts).where(eq(posts.slug, slug));
  if (post) {
    postCache.set(slug, post[0]);
  }
  return post[0];
}
```

### Image Optimization

For better performance:
1. Use image CDN services (Cloudinary, Imgix, etc.)
2. Optimize images before uploading
3. Use responsive image formats (WebP)

## Future Enhancements

- [ ] Add categories/tags for blog posts
- [ ] Implement full-text search
- [ ] Add comments section
- [ ] Implement pagination
- [ ] Add reading time estimate
- [ ] Social sharing buttons
- [ ] Related posts suggestions
- [ ] Blog post analytics
- [ ] Markdown support
- [ ] Draft auto-save

## Support

For issues or questions about the blog feature, refer to:
- Drizzle ORM Documentation: https://orm.drizzle.team/
- Neon Documentation: https://neon.tech/docs/
- React Documentation: https://react.dev/
