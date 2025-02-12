import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "/images/surya-baja-lestari_hor.png";
import "@fontsource/poppins/700.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  FaHome,
  FaUser,
  FaToolbox,
  FaEnvelope,

  FaInstagram,

  FaWhatsapp,

  FaPhone,
} from "react-icons/fa";

function App() {
  return (
    <div className="font-sans bg-gray-100">
      <Header />
      <Hero />
      <About />
      <Services />
      {/* <Portfolio /> */}
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "contact"];
      let currentSection = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 80) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<header className="bg-glass fixed w-full shadow-md z-50 transition duration-300">

      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <img src={logo} alt="Surya Baja Lestari" className="h-14 drop-shadow-lg brightness-125" />

        {/* Navigasi utama */}
        <nav className="hidden md:flex items-center space-x-10 font-[Poppins]">
          <NavItem
            href="#home"
            label="Beranda"
            icon={
              <FaHome
                className={`w-6 h-6 mr-2 ${
                  activeSection === "home" ? "text-blue-800" : "text-blue-600"
                }`}
              />
            }
          />
          <NavItem
            href="#about"
            label="Tentang"
            icon={
              <FaUser
                className={`w-6 h-6 mr-2 ${
                  activeSection === "about" ? "text-green-800" : "text-green-600"
                }`}
              />
            }
          />
          <NavItem
            href="#services"
            label="Jasa"
            icon={
              <FaToolbox
                className={`w-6 h-6 mr-2 ${
                  activeSection === "services" ? "text-yellow-800" : "text-yellow-600"
                }`}
              />
            }
          />
         
          <NavItem
            href="#contact"
            label="Kontak"
            icon={
              <FaEnvelope
                className={`w-6 h-6 mr-2 ${
                  activeSection === "contact" ? "text-red-800" : "text-red-600"
                }`}
              />
            }
          />

          {/* Ikon media sosial */}
   
          <a href="https://www.instagram.com/suryabajalestari" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition-all duration-300 transform hover:scale-110" />
          </a>
 
        </nav>

        {/* Menu Toggle Button untuk mobile */}
        <button
  className="md:hidden text-black bg-transparent backdrop-blur-lg p-2 rounded-lg border border-black/30 hover:bg-black/10 transition-all duration-300"
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? <X className="w-8 h-8 text-black" /> : <Menu className="w-8 h-8 text-black" />}
</button>

      </div>

      {/* Menu mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/30 backdrop-blur-lg shadow-md"

        >
          <nav className="flex flex-col p-4 space-y-4">
            <NavItem href="#home" label="Beranda" icon={<FaHome className="w-6 h-6 mr-2 text-blue-600" />} />
            <NavItem href="#about" label="Tentang" icon={<FaUser className="w-6 h-6 mr-2 text-green-600" />} />
            <NavItem href="#services" label="Jasa" icon={<FaToolbox className="w-6 h-6 mr-2 text-yellow-600" />} />
            {/* <NavItem href="#portfolio" label="Portfolio" icon={<FaBriefcase className="w-6 h-6 mr-2 text-purple-600" />} /> */}
            <NavItem href="#contact" label="Kontak" icon={<FaEnvelope className="w-6 h-6 mr-2 text-red-600" />} />

            
          </nav>
        </motion.div>
      )}
    </header>
  );
}



function NavItem({ href, label, icon }) {
  const handleClick = (e) => {
    e.preventDefault();
    const targetSection = document.querySelector(href);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      className="relative flex items-center text-gray-700 hover:text-blue-500 font-medium transition duration-300 cursor-pointer"
    >
      {icon}
      {label}
      <motion.span
        className="absolute left-0 bottom-0 h-0.5 bg-blue-500 w-0"
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

// ✅ Tambahkan PropTypes untuk validasi props
NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
function Hero() {
  const images = Array.from({ length: 55 }, (_, i) => `/images/islide_${String(i + 1).padStart(3, '0')}.jpg`);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="home" className="relative z-10 h-auto min-h-screen w-screen flex flex-col items-center justify-center pt-24 lg:pt-32 pb-10 lg:pb-16">
      
      {/* Background Image */}
      <AnimatePresence>
        <motion.div
          key={images[current]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images[current]}')` }}
        ></motion.div>
      </AnimatePresence>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Konten */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center text-white z-10 px-4 max-w-xl space-y-6"
      >
        
        {/* Logo (Perbaikan: Tidak Gepeng) */}
        <motion.img
          src="/images/surya-baja-lestari_hor.png"
          alt="Surya Baja Lestari"
          className="relative z-20 mx-auto h-auto w-auto max-w-xs sm:max-w-sm md:max-w-md object-contain"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Deskripsi */}
        <p className="text-md md:text-xl italic text-gray-300 drop-shadow">
          Kami siap membantu Anda mewujudkan proyek impian dengan hasil terbaik, tepat waktu, dan anggaran yang efisien.
          Jangan ragu untuk menghubungi kami untuk mendapatkan informasi lebih lanjut tentang konstruksi baja kami.
        </p>

        {/* Alamat */}
        <p className="text-lg font-bold">Alamat:</p>
        <p className="text-md md:text-lg">Jl. Raya Kutabumi, Karet, Kec. Sepatan, Kabupaten Tangerang, Banten 15520</p>

        {/* Kontak WhatsApp */}
        <div className="mt-6 flex flex-col gap-4 items-center">
          <a
            href="https://wa.me/6281288739856?text=Halo%2C%20saya%20mau%20bertanya..."
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-3 text-lg hover:from-green-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <FaWhatsapp className="text-2xl animate-pulse" />
            <span>Chat WhatsApp</span>
          </a>
        </div>

        {/* Ikon Media Sosial */}
        <div className="mt-8 flex gap-4 justify-center">
      
          <a href="https://www.instagram.com/suryabajalestari" className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full">
            <FaInstagram className="text-white text-2xl" />
          </a>
  
          
        </div>

      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 bg-black text-white flex flex-col items-center">
      <div className="container mx-auto px-6 text-center">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-6 border-b-4 border-blue-500 inline-block pb-2"
        >
          Tentang Kami
        </motion.h2>

        {/* Deskripsi perusahaan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
        >
          Selamat datang di <strong>Surya Baja Lestari</strong>, perusahaan terkemuka dalam bidang{" "}
          <em>konstruksi baja</em> dan <em>bengkel las</em> yang berdiri sejak tahun 1995.
          Kami melayani berbagai kebutuhan konstruksi dengan kualitas terbaik dan tenaga ahli profesional.
        </motion.p>

        {/* Layanan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
        >
          {/* Kolom 1 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Layanan Kami</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-left">
              <li>Konstruksi Baja & Stainless Steel</li>
              <li>Seni Klasik Besi Tempa & Seni Minimalis</li>
              <li>Pagar, Pintu Besi, dan Pintu Sliding</li>
              <li>Kanopi, Folding Gate, & Baja Ringan</li>
            </ul>
          </div>

          {/* Kolom 2 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Keunggulan Kami</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-left">
              <li>Berpengalaman lebih dari 25 tahun</li>
              <li>Material berkualitas tinggi</li>
              <li>Tenaga kerja profesional</li>
              <li>Harga kompetitif dengan hasil terbaik</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const serviceImages = [
    "rangkabaja.jpeg",
    "rangkabaja2.jpeg",
    "pagarbesi.jpeg",
    "pagarbesi2.jpeg",
    "canopy1.jpeg",
    "canopi2.jpeg",
    "canopy3.jpeg",
    "rangkabaja1.jpeg",
    "rangkabaja2.jpeg",
    "rangkabaja3.jpeg",
    "pager1.jpeg",
    "pager2.jpeg",
    "pager3.jpeg",
    "pager4.jpeg",
    "pager5.jpeg"
  ];

  return (
    <section id="services" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-10 border-b-4 border-blue-500 inline-block pb-2"
        >
          Layanan Kami
        </motion.h2>

        {/* Grid Gambar Layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {serviceImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer border border-gray-700 bg-gray-900"
              onClick={() => window.open(`/images/${src}`, "_blank")}
            >
              <img 
                src={`/images/${src}`} 
                alt={`Service ${index + 1}`} 
                className="w-full h-64 object-cover object-center hover:opacity-80 transition"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// function Portfolio() {
//   const serviceImages = [
//     "rangkabaja.jpeg",
//     "rangkabaja2.jpeg",
//     "pagarbesi.jpeg",
//     "pagarbesi2.jpeg",
//     "workshop_05.jpg",
//     "workshop_06.jpg",
//     "workshop_07.jpg",
//     "workshop_08.jpg",
//     "workshop_09.jpg"
//   ];

//   return (
//     <section id="portfolio" className="py-20 bg-gray-100">
//       <div className="container mx-auto px-6">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold text-center text-gray-800"
//         >
//           Our Portfolio
//         </motion.h2>
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {serviceImages.map((image, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:shadow-2xl transition duration-300"
//             >
//               <img
//                 src={`/images/${image}`} // pastikan gambar ada di folder /images/
//                 alt={`Besi Konstruksi ${index + 1}`}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-semibold text-gray-800">
//                   Besi Konstruksi {index + 1}
//                 </h3>
//                 <p className="text-gray-600 mt-2">
//                   Menampilkan proyek konstruksi dengan bahan baja berkualitas tinggi.
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



function Contact() {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-10"
        >
          Kontak Kami
        </motion.h2>

        <div className="flex flex-col md:flex-row md:items-start md:gap-10">
          
          {/* Informasi Kontak */}
          <div className="w-full md:w-1/2 space-y-6 text-lg text-left">
            
            <p className="tracking-wide leading-relaxed">
              <strong>Jl. Raya Kutabumi, Karet,</strong><br />
              Kec. Sepatan, Kabupaten Tangerang, Banten 15520
            </p>

            {/* Nomor Telepon */}
            <a href="tel:+6281288739856" className="flex items-center gap-4 hover:text-blue-400 transition">
              <FaPhone className="text-2xl" />
              <span className="text-lg tracking-wide">+62 812-8873-9856</span>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/6281288739856" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 hover:text-green-400 transition">
              <FaWhatsapp className="text-2xl text-green-400" />
              <span className="text-lg tracking-wide">+62 812-8873-9856 (WA)</span>
            </a>

            {/* Email */}
            <a href="mailto:suryabajalestari@gmail.com" className="flex items-center gap-4 hover:text-gray-400 transition">
              <FaEnvelope className="text-2xl text-gray-300" />
              <span className="text-lg tracking-wide underline">suryabajalestari@gmail.com</span>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/suryabajalestari" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 hover:text-pink-400 transition">
              <FaInstagram className="text-2xl text-pink-400" />
              <span className="text-lg tracking-wide">@suryabajalestari</span>
            </a>
          </div>

          {/* Google Maps */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 relative overflow-hidden rounded-lg shadow-lg">
            <div className="w-full h-0 pb-[56.25%] relative"> {/* Rasio 16:9 */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4705.446701564057!2d106.58266857573072!3d-6.153364060315091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff79d5e8195b%3A0x2daab75d9ef82135!2sSurya%20Baja%20Lestari!5e1!3m2!1sid!2sid!4v1739172224864!5m2!1sid!2sid"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Surya Baja Lestari. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default App;
