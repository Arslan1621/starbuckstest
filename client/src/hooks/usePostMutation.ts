import { useState } from "react";
import type { Post, InsertPost } from "@shared/schema";
import axios from "axios";

export function usePostMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (post: InsertPost): Promise<Post | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/posts", post);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to create post";
      setError(message);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: number, post: Partial<InsertPost>): Promise<Post | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`/api/posts/${id}`, post);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update post";
      setError(message);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/posts/${id}`);
      return true;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete post";
      setError(message);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, updatePost, deletePost, loading, error };
}
