import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  MessageCircle
} from "lucide-react";
import { PiWhatsappLogoThin } from "react-icons/pi";
import Logo from "../../public/Logo.png";
// import { createSubscription } from "../service/ApiService";
// import toast from "react-hot-toast";


const Footer = () => {
//   const [loading, setLoading] = useState(false);

//   const  handleSubmit = async(subEmail) => {
//     try {
//       setLoading(true);
//       const res = await createSubscription(subEmail)
//       console.log(res);
//       toast.success(res.data.message);
//       setSubEmail("");
      
//     } catch (error) {
//       console.error(error);
//       setSubEmail("");
//       toast.error(error.response?.data?.message);

//     } finally {
//       setLoading(false);
//     }

//   }
  return (
    <footer className="bg-[#1A1022] min-w-screen text-slate-900 border-t border-slate-500">

      <div className="max-w-full mx-auto px-10 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">

        {/* Left Section */}
        <div className="space-y-4 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 text-white font-bold">
              <img src={Logo} alt="Logo" className="w-full h-full object-cover object-top" />
            </div>
            <span className="dark:text-white text-slate-900 font-semibold text-lg">
              Hotel MoonPrince
            </span>
          </div>

          <p className="text-sm leading-relaxed dark:text-slate-400 text-slate-500 px-3">
            Building modern web experiences with precision and passion.
          </p>
        </div>

        {/* Sitemap */}
        
        <div className="sm:col-span-1">
          <h4 className="dark:text-white text-slate-900 font-semibold mb-4 tracking-wide">
            SITEMAP
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/home" className="dark:hover:text-white hover:text-slate-400 transition">Home</Link></li>
            <li><Link to="/projects" className="dark:hover:text-white hover:text-slate-400 transition">Projects</Link></li>
            <li><Link to="/skills" className="dark:hover:text-white hover:text-slate-400 transition">Skills</Link></li>
            <li><Link to="/profile" className="dark:hover:text-white hover:text-slate-400 transition">Profile</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="sm:col-span-1">
          <h4 className="dark:text-white text-slate-900 font-semibold mb-4 tracking-wide">
            SOCIAL
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://github.com/KavinMadusanka" target="_blank" rel="noreferrer" className="dark:hover:text-white hover:text-slate-400 transition">
                GitHub
              </a>
            </li>
            <li>
              <a href="www.linkedin.com/in/kavinmadhusankha" target="_blank" rel="noreferrer" className="dark:hover:text-white hover:text-slate-400 transition">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/casey.kavin/" target="_blank" rel="noreferrer" className="dark:hover:text-white hover:text-slate-400 transition">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/kavin_madusanka" target="_blank" rel="noreferrer" className="dark:hover:text-white hover:text-slate-400 transition">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://wa.me/94706846037" target="_blank" rel="noreferrer" className="dark:hover:text-white hover:text-slate-400 transition">
                Whatsapp
              </a>
            </li>
            <li>
              <a href="mailto:kavinmadusanka20011@gmail.com" target="_blank" rel="noreferrer" className="dark:hover:text-white hover:text-slate-400 transition">
                Email
              </a>
            </li>
          </ul>
        </div>
        {/* Newsletter Section */}
      <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
        <div className="dark:bg-gray-900 bg-gray-100 rounded-2xl p-8 md:p-12 shadow-lg flex flex-col items-center  gap-6">

          <div>
            <h3 className="dark:text-white text-slate-900 text-xl font-semibold mb-2">
              Stay in the Loop
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
              Get occasional updates on new projects, deep-dives into web tech, and development resources.
            </p>
          </div>

          
        </div>
      </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm dark:text-slate-400 text-slate-500">
            © 2026 Kavin Madhusankha Nugaduwa Vithana. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="https://github.com/KavinMadusanka" target="_blank" rel="noreferrer" className="p-2 dark:bg-gray-800 bg-white rounded-full dark:hover:bg-gray-700 hover:bg-slate-200 transition">
              <Github size={18} />
            </a>
            <a href="www.linkedin.com/in/kavinmadhusankha" target="_blank" rel="noreferrer" className="p-2 dark:bg-gray-800 bg-white rounded-full dark:hover:bg-gray-700 hover:bg-slate-200 transition">
              <Linkedin size={18} />
            </a>
            <a href="https://www.facebook.com/casey.kavin/" target="_blank" rel="noreferrer" className="p-2 dark:bg-gray-800 bg-white rounded-full dark:hover:bg-gray-700 hover:bg-slate-200 transition">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/kavin_madusanka" target="_blank" rel="noreferrer" className="p-2 dark:bg-gray-800 bg-white rounded-full dark:hover:bg-gray-700 hover:bg-slate-200 transition">
              <Instagram size={18} />
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/94706846037" target="_blank" rel="noreferrer" className="p-2 dark:bg-gray-800 bg-white rounded-full dark:hover:bg-gray-700 hover:bg-gray-200 transition">
              <MessageCircle size={18} />
            </a>
            {/* <a href="https://wa.me/94706846037" target="_blank" rel="noreferrer" className="p-2 dark:bg-gray-800 bg-white rounded-full dark:hover:bg-gray-700 hover:bg-slate-200 transition">
              <PiWhatsappLogoThin size={22} />
            </a> */}

            {/* Email */}
            <a href="mailto:kavinmadusanka20011@email.com" target="_blank" className="p-2 dark:bg-gray-800 bg-white rounded-full dark:hover:bg-gray-700 hover:bg-slate-200 transition">
              <Mail size={18} />
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
