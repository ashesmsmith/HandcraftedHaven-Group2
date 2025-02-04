// dashboard/auth/login/page.tsx
// Purpose: Provides a login form for users to authenticate and access their account.
export default function CustomerLoginPage() {
    return (
      <section className="container mx-auto px-4 py-10 flex justify-center items-center">
        {/* Outer "card" or panel */}
        <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">
            Customer Login
          </h1>
          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-dark-brown">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
                placeholder="email@email.com"
              />
            </div>
  
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-dark-brown">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
                placeholder="Password"
              />
            </div>
  
            {/* Sign In Button */}
            <button
              type="submit"
              className="bg-dark-brown text-cream w-full py-2 rounded hover:bg-light-brown hover:text-white transition-colors font-semibold"
            >
              Sign In
            </button>
          </form>
  
          {/* Forgot Password Link */}
          <div className="mt-4">
            <a href="#" className="text-sm text-dark-brown/70 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </section>
    );
  }
  