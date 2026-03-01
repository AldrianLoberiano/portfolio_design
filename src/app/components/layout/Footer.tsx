import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  navigation: [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
  social: [
    { name: "Facebook", url: "https://www.facebook.com/its.adinggg" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aldriancayoloberiano/" },
    { name: "GitHub", url: "https://github.com/AldrianLoberiano" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <span
                className="text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
              >
                AL
              </span>
              <p
                className="mt-4 text-white/40 max-w-sm"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}
              >
                Design engineer crafting digital experiences at the intersection
                of aesthetics and performance. Currently available for select
                projects.
              </p>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3">
              <h4
                className="text-white/30 uppercase tracking-[0.15em] mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
              >
                Navigation
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-white transition-colors duration-300"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="lg:col-span-4">
              <h4
                className="text-white/30 uppercase tracking-[0.15em] mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
              >
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.social.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-300 group"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                    >
                      {link.name}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/30"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
          >
            &copy; 2026 AL Studio. All rights reserved.
          </p>
          <p
            className="text-white/30"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
          >
            Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
