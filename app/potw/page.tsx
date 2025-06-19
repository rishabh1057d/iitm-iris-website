"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react"
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
  const [selectedMonth, setSelectedMonth] = useState("January")
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
    January: [
      {
        id: 1,
        week: 1,
        month: "January",
        theme: "Nature's Patterns",
        photographer: "Priya Sharma",
        email: "24f1002346@ds.study.iitm.ac.in",
        description:
          "This beautiful butterfly was captured during early morning at the campus garden. The intricate patterns on its wings showcase nature's artistic precision and beauty. The composition highlights the delicate balance of colors and shapes found in our natural world.",
        image: "/images/week1.jpeg",
      },
      {
        id: 2,
        week: 2,
        month: "January",
        theme: "Birds of Prey",
        photographer: "Rahul Verma",
        email: "24f1003421@ds.study.iitm.ac.in",
        description:
          "This hawk was photographed in its natural habitat, perched on a branch scanning for prey. The golden hour lighting accentuates its keen eyes and powerful presence, showcasing the majesty of these incredible birds.",
        image: "/images/week2.jpeg",
      },
      {
        id: 3,
        week: 3,
        month: "January",
        theme: "Wild Encounters",
        photographer: "Ananya Patel",
        email: "24f1001234@ds.study.iitm.ac.in",
        description:
          "This leopard was captured during a wildlife photography expedition. The intense gaze and perfect camouflage demonstrate the power and stealth of this magnificent predator in its natural environment.",
        image: "/images/week3.jpeg",
      },
      {
        id: 4,
        week: 4,
        month: "January",
        theme: "Tools of the Trade",
        photographer: "Vikram Singh",
        email: "24f1004567@ds.study.iitm.ac.in",
        description:
          "This Canon telephoto lens represents the essential equipment of a wildlife photographer. The composition highlights the precision engineering that allows us to capture distant subjects with remarkable clarity.",
        image: "/images/week4.jpeg",
      },
    ],
    February: [
      {
        id: 5,
        week: 1,
        month: "February",
        theme: "Urban Landscapes",
        photographer: "Neha Gupta",
        email: "24f1005678@ds.study.iitm.ac.in",
        description:
          "This cityscape captures the contrast between modern architecture and natural elements, showcasing how urban environments can create their own unique beauty.",
        image: "/placeholder.svg?height=600&width=400",
      },
      {
        id: 6,
        week: 2,
        month: "February",
        theme: "Reflections",
        photographer: "Arjun Mehta",
        email: "24f1006789@ds.study.iitm.ac.in",
        description:
          "This image explores the interplay of light and water, creating mesmerizing patterns that challenge our perception of reality and illusion.",
        image: "/placeholder.svg?height=600&width=400",
      },
      {
        id: 7,
        week: 3,
        month: "February",
        theme: "Macro World",
        photographer: "Divya Sharma",
        email: "24f1007890@ds.study.iitm.ac.in",
        description:
          "This extreme close-up reveals the intricate details of a small insect, opening our eyes to the complexity and beauty of the microscopic world around us.",
        image: "/placeholder.svg?height=600&width=400",
      },
      {
        id: 8,
        week: 4,
        month: "February",
        theme: "Silhouettes",
        photographer: "Karan Malhotra",
        email: "24f1008901@ds.study.iitm.ac.in",
        description:
          "This dramatic silhouette uses negative space and strong contrast to create a powerful visual statement about form and composition.",
        image: "/placeholder.svg?height=600&width=400",
      },
    ],
    March: [
      {
        id: 9,
        week: 1,
        month: "March",
        theme: "Street Photography",
        photographer: "Meera Reddy",
        email: "24f1009012@ds.study.iitm.ac.in",
        description:
          "This candid street scene captures a fleeting moment of human interaction, telling a story through gesture and expression.",
        image: "/placeholder.svg?height=600&width=400",
      },
      {
        id: 10,
        week: 2,
        month: "March",
        theme: "Abstract Patterns",
        photographer: "Rohan Joshi",
        email: "24f1000123@ds.study.iitm.ac.in",
        description:
          "This abstract composition finds beauty in everyday objects, transforming the mundane into something extraordinary through careful framing and perspective.",
        image: "/placeholder.svg?height=600&width=400",
      },
      {
        id: 11,
        week: 3,
        month: "March",
        theme: "Golden Hour",
        photographer: "Aisha Khan",
        email: "24f1001234@ds.study.iitm.ac.in",
        description:
          "This landscape harnesses the magical quality of light during the golden hour, creating a warm, ethereal atmosphere that transforms the scene.",
        image: "/placeholder.svg?height=600&width=400",
      },
      {
        id: 12,
        week: 4,
        month: "March",
        theme: "Minimalism",
        photographer: "Sanjay Patel",
        email: "24f1002345@ds.study.iitm.ac.in",
        description:
          "This minimalist composition demonstrates how simplicity and negative space can create a powerful visual impact, focusing attention on essential elements.",
        image: "/placeholder.svg?height=600&width=400",
      },
    ],
  }

  const months = [
    "January",
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
    <main className="flex min-h-screen flex-col items-center relative">
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
                    <div className="relative h-[400px] md:h-[300px]">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={`Week ${photo.week} - ${photo.theme}`}
                        fill
                        className="object-cover"
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
                  <div className="relative w-full h-auto">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={selectedPhoto.image || "/placeholder.svg"}
                        alt={selectedPhoto.theme}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain max-h-[70vh]"
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
                    <p className="text-gray-400 text-sm">{selectedPhoto.email}</p>
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

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-2"
                  >
                    <Instagram className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 text-sm">Follow on Instagram</span>
                  </motion.div>
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
