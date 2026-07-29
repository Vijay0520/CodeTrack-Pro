function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-700 py-6 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} CodeTrack-Pro. All rights reserved.
      </p>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Designed & Developed by <span className="font-semibold">Vijaykumar Gouda</span>
      </p>
    </footer>
  );
}

export default Footer;