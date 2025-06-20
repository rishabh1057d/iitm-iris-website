"use client"

import { useRef, useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export default function Gallery() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  // Store loaded images and their dimensions
  const [loadedImages, setLoadedImages] = useState<{
    [id: number]: { width: number; height: number; aspectRatio: number }
  }>({})
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // Track screen size for responsive grid
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("mobile")
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  const handleImageLoad = (id: number, e: any) => {
    const { naturalWidth, naturalHeight } = e.target
    const aspectRatio = naturalWidth / naturalHeight

    setLoadedImages((prev) => {
      const updated = {
        ...prev,
        [id]: {
          width: naturalWidth,
          height: naturalHeight,
          aspectRatio,
        },
      }

      // Check if all images are loaded
      if (Object.keys(updated).length === galleryItems.length) {
        setImagesLoaded(true)
      }

      return updated
    })
  }

  // Updated gallery items with real photos
  const galleryItems = [
    { id: 1, alt: "Anshi Portrait", src: "/images/anshi.e2e1cc8fa6f466cf14f9.png", photographer: "Anshi Jain" },
    { id: 2, alt: "Architectural Wonders", src: "/images/architectural_wonders.png", photographer: "Fatima Fidha" },
    { id: 3, alt: "Golden Hour", src: "/images/golden_hour.png", photographer: "Arnab Sarkar" },
    { id: 4, alt: "Macro Magic", src: "/images/macro_magiv.png", photographer: "Ashwin A" },
    { id: 5, alt: "Daily Hustle", src: "/images/daily_hustle.png", photographer: "Anirban Das" },
    { id: 6, alt: "Paint With Light", src: "/images/paint_with_light.png", photographer: "Naman Deep Singh" },
    { id: 7, alt: "Silence of Shadows", src: "/images/silence_of_shadows.png", photographer: "Rishabh Singh" },
    { id: 8, alt: "Raahat Poster", src: "/images/raahat_poster.png", photographer: "IRIS Society" },
    { id: 9, alt: "She Frames", src: "/images/she_frames.png", photographer: "IRIS Society" },
    { id: 10, alt: "Swapnil Acharya", src: "/images/swapnil-acharya.jpg", photographer: "Swapnil Acharya" },
    { id: 11, alt: "Week 1", src: "/images/week1.jpeg", photographer: "IRIS Society" },
  ]

  // Get responsive grid configuration
  const getGridConfig = () => {
    switch (screenSize) {
      case "mobile":
        return {
          columns: 2,
          baseWidth: 160,
          gap: 8,
          maxSpan: 2,
        }
      case "tablet":
        return {
          columns: 3,
          baseWidth: 200,
          gap: 12,
          maxSpan: 2,
        }
      default:
        return {
          columns: 4,
          baseWidth: 240,
          gap: 16,
          maxSpan: 3,
        }
    }
  }

  // Calculate dynamic grid item properties based on actual aspect ratios
  const getGridItemProperties = (item: any, index: number) => {
    const imageData = loadedImages[item.id]
    const config = getGridConfig()

    if (!imageData) {
      // Default while loading
      return {
        colSpan: 1,
        aspectRatio: 1,
        priority: 0,
      }
    }

    const { aspectRatio } = imageData
    let colSpan = 1
    let priority = 0

    // Determine column span based on aspect ratio and screen size
    if (screenSize === "mobile") {
      // Mobile: Conservative spanning
      if (aspectRatio > 1.6) {
        colSpan = 2
        priority = 1
      } else if (aspectRatio < 0.6) {
        colSpan = 1
        priority = 2
      }
    } else if (screenSize === "tablet") {
      // Tablet: Moderate spanning
      if (aspectRatio > 1.8) {
        colSpan = 2
        priority = 1
      } else if (aspectRatio > 1.3 && index % 5 === 0) {
        colSpan = 2
        priority = 1
      } else if (aspectRatio < 0.6) {
        colSpan = 1
        priority = 2
      }
    } else {
      // Desktop: Full spanning capabilities
      if (aspectRatio > 2.0) {
        colSpan = 3
        priority = 3
      } else if (aspectRatio > 1.5) {
        colSpan = 2
        priority = 2
      } else if (aspectRatio > 1.2 && index % 6 === 0) {
        colSpan = 2
        priority = 1
      } else if (aspectRatio < 0.6) {
        colSpan = 1
        priority = 2
      }
    }

    // Ensure we don't exceed max span
    colSpan = Math.min(colSpan, config.maxSpan)

    return {
      colSpan,
      aspectRatio,
      priority,
    }
  }

  // Sort images for better layout distribution
  const getSortedItems = () => {
    if (!imagesLoaded) return galleryItems

    return [...galleryItems].sort((a, b) => {
      const propsA = getGridItemProperties(a, galleryItems.indexOf(a))
      const propsB = getGridItemProperties(b, galleryItems.indexOf(b))

      // Sort by priority (higher priority first), then by aspect ratio
      if (propsA.priority !== propsB.priority) {
        return propsB.priority - propsA.priority
      }

      return propsB.aspectRatio - propsA.aspectRatio
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const config = getGridConfig()
  const sortedItems = getSortedItems()

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 w-full max-w-7xl mx-auto">
        <motion.h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Gallery
        </motion.h1>

        {/* Dynamic Masonry Grid */}
        <motion.div
          ref={galleryRef}
          className={`
            columns-2 sm:columns-3 lg:columns-4 xl:columns-5
            gap-3 sm:gap-4 lg:gap-6
            transition-opacity duration-500
            ${imagesLoaded ? "opacity-100" : "opacity-70"}
          `}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedItems.map((item, index) => {
            const imageData = loadedImages[item.id]
            const originalIndex = galleryItems.findIndex((gi) => gi.id === item.id)

            return (
              <motion.div
                key={item.id}
                className="gallery-item glass-card bg-gray-900/60 group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid mb-3 sm:mb-4 lg:mb-6"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  zIndex: 10,
                  transition: { duration: 0.2 },
                }}
                custom={index}
              >
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: imageData ? `${imageData.aspectRatio}` : "1",
                  }}
                >
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
                    onLoad={(e) => handleImageLoad(item.id, e)}
                    sizes={`
                      (max-width: 640px) 50vw,
                      (max-width: 1024px) 33vw,
                      (max-width: 1280px) 25vw,
                      20vw
                    `}
                    priority={index < 8} // Prioritize first 8 images
                    quality={90}
                  />

                  {/* Photographer overlay with improved positioning */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end bg-gradient-to-t from-black/30 via-black/10 to-transparent">
                    <div className="w-full p-3 sm:p-4">
                      <span className="inline-block bg-black/80 rounded px-3 py-1 text-white text-sm sm:text-base font-medium drop-shadow-lg leading-tight">
                        {item.photographer}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced light sweep effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-[-25deg] group-hover:animate-[shine_0.8s_ease-out] pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Loading indicator with progress */}
        {!imagesLoaded && (
          <div className="flex flex-col items-center mt-8 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="text-gray-400">Loading gallery...</span>
            </div>
            <div className="w-64 bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(Object.keys(loadedImages).length / galleryItems.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-500">
              {Object.keys(loadedImages).length} of {galleryItems.length} images loaded
            </p>
          </div>
        )}

        {/* Gallery stats - development only */}
        {process.env.NODE_ENV === "development" && imagesLoaded && (
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg text-sm text-gray-400 space-y-2">
            <p>
              Screen: {screenSize} | Images: {galleryItems.length} | Loaded: {Object.keys(loadedImages).length}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
              {Object.entries(loadedImages).map(([id, data]) => (
                <div key={id} className="bg-gray-700/50 p-2 rounded">
                  ID {id}: {data.width}×{data.height} ({Math.round(data.aspectRatio * 100) / 100}:1)
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />

      <style jsx>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 150%;
          }
        }
        
        /* Ensure proper column breaks */
        .gallery-item {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        /* Smooth column transitions */
        @media (min-width: 640px) {
          .gallery-item {
            transition: transform 0.3s ease, box-shadow 1.3s ease;
          }
        }
      `}</style>
    </main>
  )
}
