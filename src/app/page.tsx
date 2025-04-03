'use client';

const APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID as string;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/webhook/meta/auth/facebook/callback`;
const SCOPES = [
  "pages_show_list",
  "pages_read_engagement",
  "pages_manage_posts"
];

export default function Home() {
  const handleLogin = () => {
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join(",")}&response_type=code`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white dark:bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-foreground">Facebook Page Manager</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-8">
            <button
              onClick={handleLogin}
              className="bg-[#1877F2] hover:bg-[#1664D9] text-white font-bold py-3 px-6 rounded-lg inline-flex items-center space-x-2 transition duration-200"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Login with Facebook</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
