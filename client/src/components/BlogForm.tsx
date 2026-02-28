import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPostSchema, type Post } from "@shared/schema";
import { usePostMutation } from "@/hooks/usePostMutation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { z } from "zod";

type FormData = z.infer<typeof insertPostSchema>;

interface BlogFormProps {
  initialPost?: Post;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function BlogForm({ initialPost, onSuccess, onCancel }: BlogFormProps) {
  const { createPost, updatePost, loading } = usePostMutation();
  const [ogTags, setOgTags] = useState({
    title: initialPost?.ogTags?.title || "",
    description: initialPost?.ogTags?.description || "",
    image: initialPost?.ogTags?.image || "",
    type: initialPost?.ogTags?.type || "article",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(insertPostSchema),
    defaultValues: initialPost
      ? {
          title: initialPost.title,
          slug: initialPost.slug,
          content: initialPost.content,
          excerpt: initialPost.excerpt || "",
          coverImage: initialPost.coverImage || "",
          published: initialPost.published,
          metaTitle: initialPost.metaTitle || "",
          metaDescription: initialPost.metaDescription || "",
          metaRobots: initialPost.metaRobots || "index, follow",
          ogTags: initialPost.ogTags,
          articleSchema: initialPost.articleSchema,
        }
      : {
          published: false,
          metaRobots: "index, follow",
          ogTags: { type: "article" },
        },
  });

  const title = watch("title");

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !initialPost) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setValue("slug", slug);
    }
  }, [title, initialPost, setValue]);

  const onSubmit = async (data: FormData) => {
    const submitData = {
      ...data,
      ogTags: ogTags,
    };

    let success = false;
    if (initialPost) {
      const result = await updatePost(initialPost.id, submitData);
      success = !!result;
    } else {
      const result = await createPost(submitData);
      success = !!result;
    }

    if (success) {
      toast.success(initialPost ? "Post updated" : "Post created");
      onSuccess?.();
    } else {
      toast.error("Failed to save post");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter post title"
              {...register("title")}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              placeholder="auto-generated-slug"
              {...register("slug")}
              className={errors.slug ? "border-destructive" : ""}
            />
            {errors.slug && <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief summary of the post"
              rows={2}
              {...register("excerpt")}
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog post content here"
              rows={8}
              {...register("content")}
              className={errors.content ? "border-destructive" : ""}
            />
            {errors.content && <p className="text-sm text-destructive mt-1">{errors.content.message}</p>}
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              placeholder="https://example.com/image.jpg"
              {...register("coverImage")}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="published" {...register("published")} />
            <Label htmlFor="published" className="cursor-pointer">
              Publish this post
            </Label>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tags</CardTitle>
              <CardDescription>Optimize for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  placeholder="Page title for search results"
                  {...register("metaTitle")}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 50-60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Page description for search results"
                  rows={2}
                  {...register("metaDescription")}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 150-160 characters
                </p>
              </div>

              <div>
                <Label htmlFor="metaRobots">Meta Robots</Label>
                <Input
                  id="metaRobots"
                  placeholder="index, follow"
                  {...register("metaRobots")}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Default: "index, follow"
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open Graph Tags</CardTitle>
              <CardDescription>For social media sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ogTitle">OG Title</Label>
                <Input
                  id="ogTitle"
                  placeholder="Title for social sharing"
                  value={ogTags.title}
                  onChange={(e) => setOgTags({ ...ogTags, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="ogDescription">OG Description</Label>
                <Textarea
                  id="ogDescription"
                  placeholder="Description for social sharing"
                  rows={2}
                  value={ogTags.description}
                  onChange={(e) => setOgTags({ ...ogTags, description: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="ogImage">OG Image URL</Label>
                <Input
                  id="ogImage"
                  placeholder="https://example.com/image.jpg"
                  value={ogTags.image}
                  onChange={(e) => setOgTags({ ...ogTags, image: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="ogType">OG Type</Label>
                <Input
                  id="ogType"
                  placeholder="article"
                  value={ogTags.type}
                  onChange={(e) => setOgTags({ ...ogTags, type: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schema Tab */}
        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Article Schema</CardTitle>
              <CardDescription>
                JSON-LD structured data for rich snippets (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article headline",
  "description": "Article description",
  "image": "https://example.com/image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author name"
  },
  "datePublished": "2024-01-01"
}`}
                rows={10}
                defaultValue={
                  initialPost?.articleSchema
                    ? JSON.stringify(initialPost.articleSchema, null, 2)
                    : ""
                }
                onChange={(e) => {
                  try {
                    const schema = JSON.parse(e.target.value);
                    setValue("articleSchema", schema);
                  } catch {
                    // Invalid JSON, ignore
                  }
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialPost ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
