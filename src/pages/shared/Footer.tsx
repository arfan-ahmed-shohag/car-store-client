import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import BrandLogo from "./BrandLogo";

const Footer = () => (
  <footer className="border-t border-brand/25 bg-brand-ink text-zinc-400">
    <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <Link to="/" aria-label="AutoSphere home" className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <BrandLogo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Explore our collection. Find your next drive.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-brand">Home</Link>
          <Link to="/products" className="transition-colors hover:text-brand">Products</Link>
          <Link to="/contact" className="inline-flex items-center gap-1 transition-colors hover:text-brand">
            Contact <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
      <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} AutoSphere. All rights reserved.</p>
        <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" /> Your journey starts here.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
