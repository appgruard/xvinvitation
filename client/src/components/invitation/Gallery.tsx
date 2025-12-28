import { motion } from "framer-motion";
import { useState } from "react";
import img1 from "../../assets/gallery/MBFP_213_1766948087849.jpg";
import img2 from "../../assets/gallery/MBFP_166_1766948087889.jpg";
import img3 from "../../assets/gallery/MBFP_011_1766948087898.jpg";
import img4 from "../../assets/gallery/MBFP_095_1766948087906.jpg";
import img5 from "../../assets/gallery/MBFP_091_1766948087914.jpg";
import img6 from "../../assets/gallery/MBFP_099_1766948087922.jpg";
import img7 from "../../assets/gallery/MBFP_205_1766948087931.jpg";

const galleryImages = [img1, img2, img3, img4, img5, img6, img7];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="font-script text-5xl md:text-6xl text-rose-500">Mi Galería</h2>
        <div className="w-24 h-1 bg-rose-300 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            onClick={() => setSelectedIndex(index)}
          >
            <motion.img
              src={image}
              alt={`Foto XV Años ${index + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        ))}
      </div>

      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedIndex]}
              alt={`Foto XV Años ${selectedIndex + 1}`}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-12 right-0 text-white text-4xl font-bold hover:opacity-70 transition"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
