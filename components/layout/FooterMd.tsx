import { NAV_LINKS } from "@/utils/constants";
import Link from "next/link";
import { categories } from "@/utils/categories";
import { addresses } from "@/utils/addresses";

import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Github,
} from "lucide-react";

const icons = [Youtube, Github, Instagram, Linkedin, Facebook];

const FooterMd = () => {
  return (
    <div
      className="
        grid grid-cols-2 lg:grid-cols-4 gap-8
        border-b
        mt-0 py-6 px-6
        text-slate-800
        dark:text-slate-200 "
    >
      {/* Column 1 */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-sm">Discover our products</h3>

        <div className="flex gap-3 text-gray-400 dark:text-gray-300 font-bold">
          {icons.map((Icon, i) => (
            <div
              key={i}
              className="
                w-7 h-7 flex items-center justify-center
                rounded-full
                border-2 border-gray-400 dark:border-gray-500
                transition-transform duration-500
                hover:scale-105 cursor-pointer
              "
            >
              <Icon size={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-sm">Quick Links</h3>
        {NAV_LINKS?.map((item) => (
          <Link key={item.title} href={item.href} className="text-sm hover:text-indigo-500">
            {item.title}
          </Link>
        ))}
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-2 mb-3">
        <h3 className="font-semibold text-sm">Categories</h3>
        {categories?.map((item) => (
          <Link key={item.title} href="/" className="text-sm hover:text-indigo-500">
            {item.title}
          </Link>
        ))}
      </div>

      {/* Column 4 */}
      <div className="flex flex-col text-sm gap-3">
        <h3 className="font-semibold text-sm">Get In Touch With Us</h3>

        {addresses.map(({ icon: Icon, title, value }) => (
          <div key={title} className="flex items-start gap-2">
            <Icon size={20} className="shrink-0" />
            <div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-slate-600 dark:text-slate-300">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterMd;
