export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg border border-border">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Sign In to EyeHearU</h2>
        
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-background border border-input rounded-md p-2 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-muted-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-background border border-input rounded-md p-2 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition-colors mt-2">
            Sign In
          </button>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-accent hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
