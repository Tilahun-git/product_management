import FooterMd from "./FooterMd";

export default function Footer() {
  return (
    <footer
      className="bg-gray-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-4">
      <FooterMd />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-3">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  );
}
