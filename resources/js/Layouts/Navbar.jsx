import { Link } from "@inertiajs/react";
import React from "react";

export default function Navbar() {
  return (
    <div data-theme="dark" className="w-full">
      <div className="navbar bg-base-100 min-h-[48px] px-2 justify-between">
        {/* Logo + Judul - benar-benar kiri */}
        <div className="flex items-center">
          <a className="btn btn-ghost normal-case text-base flex items-center gap-2 px-1 py-0 h-auto">
            <img src="/images/logoIMK.png" alt="Logo IMK" className="w-5 h-5" />
            PTSP IMK
          </a>
        </div>

        {/* Menu besar (hanya desktop) */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-sm">
            <li>
              <Link href={route('beranda')} method="get">
                Beranda
              </Link>
            </li>
            <li>
              <details>
                <summary>Standar Layanan</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><a>Layanan Mahasiswa</a></li>
                  <li><a>Layanan Umum</a></li>
                </ul>
              </details>
            </li>
            <li><a href={route('login')}> Login</a></li>
          </ul>
        </div>

        {/* Hamburger Menu (mobile) */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle h-auto py-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52 text-sm"
          >
            <li><a>Beranda</a></li>
            <li>
              <details>
                <summary>Standar Layanan</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><a>Layanan Mahasiswa</a></li>
                  <li><a>Layanan Umum</a></li>
                </ul>
              </details>
            </li>
            <li>
              <Link href={route('login')}>Login</Link>
            
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
