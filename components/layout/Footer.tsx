import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-2xl text-white dark:bg-neutral-900 dark:text-white py-8 sticky bottom-0">        

        {/* Bottom copyright */}
        <div className="text-center text-sm text-gray-500 ">
          © {new Date().getFullYear()} MyBrand. All rights reserved.
        </div>
    </footer>
  );
}

  