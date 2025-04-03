'use client';

import { useEffect, useState } from "react";
import axios from "axios";

export default function FacebookPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/webhook/meta/pages`);
        setPages(response.data.data.data || []);
      } catch (err) {
        console.error("Error loading pages:", err);
      }
      setLoading(false);
    };

    fetchPages();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white dark:bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-foreground">Your Facebook Pages</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {!loading && pages.length > 0 && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">🎉 Pages You Manage</h2>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {pages.map((page: any) => (
                    <li key={page.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-foreground">{page.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ID: {page.id}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {!loading && pages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No pages found. Make sure you have logged in with Facebook.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}