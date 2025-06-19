"use client"

import { useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export default function Gallery() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  })

  // Transform values for parallax effect on gallery items
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  // Sample gallery items with different aspect ratios
  const galleryItems = [
    { id: 1, alt: "Landscape View", width: 800, height: 500, className: "col-span-2" },
    { id: 2, alt: "Portrait Shot", width: 400, height: 600, className: "row-span-2" },
    { id: 3, alt: "Square Photo", width: 400, height: 400 },
    { id: 4, alt: "Wide Shot", width: 800, height: 400, className: "col-span-2" },
    { id: 5, alt: "Square Memory", width: 400, height: 400 },
    { id: 6, alt: "Landscape View", width: 600, height: 400, className: "col-span-2" },
    { id: 7, alt: "Portrait Shot", width: 400, height: 600, className: "row-span-2" },
    { id: 8, alt: "Square Photo", width: 400, height: 400 },
    { id: 9, alt: "Wide Shot", width: 800, height: 400, className: "col-span-2" },
    { id: 10, alt: "Vertical View", width: 400, height: 600, className: "row-span-2" },
    { id: 11, alt: "Square Memory", width: 400, height: 400 },
  ]

  // Animation variants for gallery items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Calculate individual item Y transforms outside the map function
  const itemYTransforms = galleryItems.map((item, index) =>
    useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 100 : 50, index % 2 === 0 ? -50 : -100])
  )

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Navbar />
      <div className="pt-24 pb-12 px-6 w-full max-w-6xl mx-auto">
        <motion.h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Gallery
        </motion.h1>

        <motion.div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`gallery-item glass-card ${item.className || ""}`}
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              custom={index}
              style={{
                y: itemYTransforms[index],
              }}
            >
              <Image
                src={`/placeholder.svg?height=${item.height}&width=${item.width}`}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}
