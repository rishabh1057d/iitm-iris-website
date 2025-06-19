"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"

// Weekly photo type
type WeeklyPhoto = {
  id: number
  week: number
  month: string
  theme: string
  photographer: string
  email: string
  description: string
  image: string
}

export default function POTW() {
  const [selectedMonth, setSelectedMonth] = useState("February")
  const [selectedPhoto, setSelectedPhoto] = useState<WeeklyPhoto | null>(null)
  const [showModal, setShowModal] = useState(false)
  // Removed click tracking functionality - will be re-added with database later

  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  const isTitleInView = useInView(titleRef, { once: true })
  const isDescInView = useInView(descRef, { once: true })
  const isCalendarInView = useInView(calendarRef, { once: true })

  // Sample data for weekly photos
  const weeklyPhotos: Record<string, WeeklyPhoto[]> = {
    February: [
      {
        id: 5,
        week: 1,
        month: "February",
        theme: "Wildlife - Animal Kingdom",
        photographer: "Arnab Sarkar",
        email: "24f1005678@ds.study.iitm.ac.in",
        description:
          "In the heart of the wild, this stunning shot of a leopard emerging from the shadows captures both grace and raw power. The intense gaze, the perfect camouflage, and the quiet dominance of this majestic beast remind us why the animal kingdom never ceases to awe. A moment frozen in time — fierce, fearless, and breathtaking. Let nature write its own story through your lens.",
        image: "/images/week3.jpeg",  
      },
      {
        id: 6,
        week: 2,
        month: "February",
        theme: "The Golden Hour",
        photographer: "Arnab Sarkar",
        email: "24f1006789@ds.study.iitm.ac.in",
        description:
          "Bathed in golden tranquility, this serene riverside scene captures the essence of the golden hour. The calm waters reflect the setting sun like a mirror, while the lone boat and silhouettes of trees add a poetic stillness to the moment. A perfect blend of light, shadow, and emotion — this image is where nature whispers peace and the sky tells its final story of the day.",
        image: "/images/golden_hour.png",
      },
      {
        id: 7,
        week: 3,
        month: "February",
        theme: "Macro Magic",
        photographer: "Ashwin A",
        email: "24f1007890@ds.study.iitm.ac.in",
        description:
          "Tiny yet powerful — this macro shot captures a rare moment between two ants in stunning detail. The vibrant green backdrop and sharp focus reveal the hidden beauty of nature's smallest wonders.",
        image: "/images/macro_magiv.png",
      },
    ],
    March: [
      {
        id: 9,
        week: 1,
        month: "March",
        theme: "Daily Hustle",
        photographer: "Anirban Das",
        email: "24f1009012@ds.study.iitm.ac.in",
        description:
          "Amidst the crowd and chaos, this striking frame freezes a powerful moment of stillness. The vibrant orange-robed figure stands out, telling a silent story in the middle of the city's rush — a perfect slice of everyday life captured in motion. ",
        image: "/images/daily_hustle.png",
      },
      {
        id: 10,
        week: 2,
        month: "March",
        theme: " Architectural Wonders",
        photographer: "Fatima Fidha",
        email: "24f1000123@ds.study.iitm.ac.in",
        description:
          "A masterpiece of symmetry and light, this shot captures the elegance of design reflected in still water. The rhythmic arches and glowing domes tell a story of craftsmanship that transcends time — where architecture becomes poetry in stone.",
        image: "/images/architectural_wonders.png",
      },
      {
        id: 11,
        week: 3,
        month: "March",
        theme: "Wheels In Motion",
        photographer: "Arghyadeep Biswas",
        email: "24f1001234@ds.study.iitm.ac.in",
        description:
          "A vibrant glimpse into the pulse of the city — this shot captures the thrill of motion from the heart of an auto ride. The blur of neon-lit streets and the rainy windshield bring speed, story, and street life together in one dynamic frame. ",
        image: "/images/wheels_in_motion.png",
      },
      {
        id: 12,
        week: 4,
        month: "March",
        theme: "Capture the Flavor",
        photographer: "Isha Gupta",
        email: "24f1002345@ds.study.iitm.ac.in",
        description:
          "This sizzling shot of cheesy, spicy pizza is a flavor explosion captured in a frame. The golden crust, melty layers, and fiery toppings make it absolutely irresistible — a true celebration of comfort food done right!",
        image: "/images/capture_flavour.png",
      },
    ],
    April: [
      {
        id: 9,
        week: 1,
        month: "Arpil",
        theme: "Daily Hustle",
        photographer: "Anirban Das",
        email: "24f1009012@ds.study.iitm.ac.in",
        description:
          "Amidst the crowd and chaos, this striking frame freezes a powerful moment of stillness. The vibrant orange-robed figure stands out, telling a silent story in the middle of the city's rush — a perfect slice of everyday life captured in motion. ",
        image: "/images/daily_hustle.png",
      },
      {
        id: 10,
        week: 2,
        month: "April",
        theme: " Architectural Wonders",
        photographer: "Fatima Fidha",
        email: "24f1000123@ds.study.iitm.ac.in",
        description:
          "A masterpiece of symmetry and light, this shot captures the elegance of design reflected in still water. The rhythmic arches and glowing domes tell a story of craftsmanship that transcends time — where architecture becomes poetry in stone.",
        image: "/images/architectural_wonders.png",
      },
      {
        id: 11,
        week: 3,
        month: "April",
        theme: "Wheels In Motion",
        photographer: "Arghyadeep Biswas",
        email: "24f1001234@ds.study.iitm.ac.in",
        description:
          "A vibrant glimpse into the pulse of the city — this shot captures the thrill of motion from the heart of an auto ride. The blur of neon-lit streets and the rainy windshield bring speed, story, and street life together in one dynamic frame. ",
        image: "/images/wheels_in_motion.png",
      },
      {
        id: 12,
        week: 4,
        month: "April",
        theme: "Capture the Flavor",
        photographer: "Isha Gupta",
        email: "24f1002345@ds.study.iitm.ac.in",
        description:
          "This sizzling shot of cheesy, spicy pizza is a flavor explosion captured in a frame. The golden crust, melty layers, and fiery toppings make it absolutely irresistible — a true celebration of comfort food done right!",
        image: "/images/capture_flavour.png",
      },
    ],
  }

  const months = [
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handlePhotoClick = async (photo: WeeklyPhoto) => {
    setSelectedPhoto(photo)
    setShowModal(true)
    // Removed database click tracking - will be re-added later
  }

  const handlePrevMonth = () => {
    const currentIndex = months.indexOf(selectedMonth)
    const prevIndex = (currentIndex - 1 + months.length) % months.length
    setSelectedMonth(months[prevIndex])
  }

  const handleNextMonth = () => {
    const currentIndex = months.indexOf(selectedMonth)
    const nextIndex = (currentIndex + 1) % months.length
    setSelectedMonth(months[nextIndex])
  }

  // Animation variants
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative" onContextMenu={e => e.preventDefault()}>
      <Navbar />
      <div className="pt-24 pb-12 px-6 w-full max-w-6xl mx-auto">
        <motion.h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-300"
          initial={{ opacity: 0, y: -20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Photo of the Week
        </motion.h1>

        <motion.p
          ref={descRef}
          className="text-gray-300 text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={isDescInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Each week, IRIS Society members submit photos based on a theme. The best submission is featured as our Photo
          of the Week. Browse through our calendar to see the winning entries.
        </motion.p>

        <motion.div
          ref={calendarRef}
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          animate={isCalendarInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center"
            key={selectedMonth}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {selectedMonth}
          </motion.h2>
          <motion.button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Removed click count display - will be re-added with database */}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMonth}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {weeklyPhotos[selectedMonth] && weeklyPhotos[selectedMonth].length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {weeklyPhotos[selectedMonth].map((photo) => (
                  <motion.div
                    key={photo.id}
                    className="potw-card rounded-lg overflow-hidden cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <div className="relative h-[400px] md:h-[300px] w-full">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={`Week ${photo.week} - ${photo.theme}`}
                        fill
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-xl font-bold text-white">Week {photo.week}</h3>
                        <p className="text-sm text-gray-300">{photo.theme}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-400">No photos available for {selectedMonth}.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal for photo details */}
      <AnimatePresence>
        {showModal && selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-gray-900 rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-2">
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex flex-col md:flex-row overflow-hidden">
                {/* Image container with natural aspect ratio */}
                <div className="md:w-3/5 flex items-center justify-center p-2">
                  <div className="flex items-center justify-center w-full h-[70vh]">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <Image
                        src={selectedPhoto.image || "/placeholder.svg"}
                        alt={selectedPhoto.theme}
                        width={800}
                        height={600}
                        className="object-contain max-h-full max-w-full mx-auto"
                        style={{ display: 'block' }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Details section */}
                <div className="md:w-2/5 p-6 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4"
                  >
                    <h3 className="text-xl font-bold">{selectedPhoto.photographer}</h3>
                  </motion.div>

                  <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg font-semibold text-blue-300 mb-2"
                  >
                    Theme of the week: {selectedPhoto.theme}
                  </motion.h4>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-gray-300 mb-6"
                  >
                    {selectedPhoto.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
