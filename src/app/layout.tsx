"use client";

// src/app/layout.tsx
import React from "react";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import ClientLayout from "./client-layout";
import { metadata } from "./metadata";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Function to check if the link is active
  const isActive = (path: string) => pathname === path;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <ClientLayout>
          <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  XRP DAO
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className={`nav-link ${isActive("/") ? "active" : ""}`}
                        aria-current="page"
                        href="/"
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          isActive("/members") ? "active" : ""
                        }`}
                        href="/members"
                      >
                        Members
                      </a>
                    </li>
                  </ul>
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </nav>
          </header>
        </ClientLayout>
        <main>{children}</main>
        <footer className="text-center border-top p-5 mt-5">
          <div className="container">
            <p>© 2023 XRP DAO. All rights reserved.</p>
          </div>
        </footer>
        <script
          async
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
};

export default RootLayout;
