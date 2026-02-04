import { Link } from 'react-router-dom'
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-crm-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-3">
            <div className="text-lg font-semibold text-crm-text">
              Real Estate CRM
            </div>
            <p className="text-sm text-crm-muted">
              A modern CRM to manage properties, enquiries, and leads efficiently.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <div className="mb-3 text-sm font-semibold text-crm-text">
              Quick Links
            </div>
            <ul className="space-y-2 text-sm text-crm-muted">
              <li>
                <Link to="/" className="hover:text-crm-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-crm-primary">
                  Properties
                </Link>
              </li>


            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <div className="mb-3 text-sm font-semibold text-crm-text">
              Contact
            </div>
            <ul className="space-y-2 text-sm text-crm-muted">
              <li>Email: support@realestatecrm.com</li>
              <li>Phone: +91 99999 99999</li>
              <li>Location: India</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <div className="mb-3 text-sm font-semibold text-crm-text">
              Follow Us
            </div>
            <div className="flex items-center gap-4 text-xl text-crm-muted">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-crm-primary"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-crm-primary"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-crm-primary"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-crm-primary"
              >
                <FaTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-crm-primary"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-crm-border pt-4 text-xs text-crm-muted md:flex-row">
          <div>
            © {new Date().getFullYear()} Real Estate CRM. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-crm-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-crm-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
