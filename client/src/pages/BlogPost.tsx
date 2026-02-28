import { usePost } from "@/hooks/usePosts";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const { post, loading, error } = usePost(slug);

  useEffect(() => {
    if (post) {
      // Update document title and meta tags
      document.title = post.metaTitle || post.title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", post.metaDescription || post.excerpt || "");
      }

      // Update OG tags
      if (post.ogTags) {
        const updateMetaTag = (property: string, content: string) => {
          let tag = document.querySelector(`meta[property="${property}"]`);
          if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute("property", property);
            document.head.appendChild(tag);
          }
          tag.setAttribute("content", content);
        };

        if (post.ogTags.title) updateMetaTag("og:title", post.ogTags.title);
        if (post.ogTags.description) updateMetaTag("og:description", post.ogTags.description);
        if (post.ogTags.image) updateMetaTag("og:image", post.ogTags.image);
        if (post.ogTags.type) updateMetaTag("og:type", post.ogTags.type);
      }

      // Add Article schema
      if (post.articleSchema) {
        let schemaScript = document.querySelector('script[type="application/ld+json"]');
        if (!schemaScript) {
          schemaScript = document.createElement("script");
          schemaScript.setAttribute("type", "application/ld+json");
          document.head.appendChild(schemaScript);
        }
        schemaScript.textContent = JSON.stringify(post.articleSchema);
      }
    }
  }, [post]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-8">
            {error}
          </div>
          <Link href="/blogs">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/4 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <p className="text-muted-foreground mb-4">Post not found</p>
          <Link href="/blogs">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/blogs">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>

        {post.coverImage && (
          <div className="w-full h-96 rounded-lg overflow-hidden mb-8 bg-muted">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.createdAt.toString()}>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div
              className="text-base leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
