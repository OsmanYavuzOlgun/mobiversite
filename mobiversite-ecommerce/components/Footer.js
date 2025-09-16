"use client";

import { FaMailBulk, FaLinkedin, FaGoogle } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <h2 className="text-2xl font-extrabold mb-4 text-gray-900">
            MOBIVERSITE
          </h2>
          <p className="text-sm mb-6">
            We have clothes that suit your style and which you’re proud to wear.
            From women to men.
          </p>
          <div className="flex space-x-4 text-gray-600">
            <a href="info@mobiversite.com" aria-label="info">
              <FaMailBulk className="hover:text-blue-500" />
            </a>
            <a href="https://www.mobiversite.com" aria-label="website">
              <FaGoogle className="hover:text-blue-500" />
            </a>
            <a
              href="www.linkedin.com/company/mobiversite?originalSubdomain=tr"
              aria-label="linkedin"
            >
              <FaLinkedin className="hover:text-blue-500" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-900">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-900">HELP</h3>
          <ul className="space-y-2 text-sm">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-900">FAQ</h3>
          <ul className="space-y-2 text-sm">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-gray-900">RESOURCES</h3>
          <ul className="space-y-2 text-sm">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mobiversite. All rights reserved.
      </div>
    </footer>
  );
}
