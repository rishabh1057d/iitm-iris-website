"use client"

import { useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import MagneticButton from "@/components/magnetic-button"

export default function Events() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ongoingRef = useRef<HTMLHeadingElement>(null)
  const upcomingRef = useRef<HTMLHeadingElement>(null)
  const previousRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isTitleInView = useInView(titleRef, { once: true })
  const isOngoingInView = useInView(ongoingRef, { once: true })
  const isUpcomingInView = useInView(upcomingRef, { once: true })
  const isPreviousInView = useInView(previousRef, { once: true })

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform values for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Navbar />
      <div ref={containerRef} className="pt-24 pb-12 px-6 w-full max-w-6xl mx-auto">
        <motion.h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          style={{ opacity }}
        >
          Event Calendar
        </motion.h1>

        <motion.section
          className="mb-12"
          ref={ongoingRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isOngoingInView ? "visible" : "hidden"}
          style={{ y: y1 }}
        >
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-700">Ongoing Events</h2>
          <p className="text-gray-400">No events are going on right now.</p>
        </motion.section>

        <motion.section
          className="mb-12"
          ref={upcomingRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isUpcomingInView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-700">Upcoming Events</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={cardContainerVariants}
            initial="hidden"
            animate={isUpcomingInView ? "visible" : "hidden"}
          >
            {/* Event Card 1 */}
            <motion.div
              className="event-card glass-card-event"
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              style={{ y: useTransform(scrollYProgress, [0, 1], [50, -30]) }}
            >
              <div className="h-48 bg-gray-700 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Shutter Safari: Virtual Edition"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Shutter Safari: Virtual Edition</h3>
                <p className="text-gray-300 mb-3">
                  48-hour coding challenge to build innovative solutions for real-world problems.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>April 20-22, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Margashri</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>IRIS Society X Kanha House</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MagneticButton strength={20}>
                    <Link
                      href="#"
                      className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Know More
                    </Link>
                  </MagneticButton>
                  <MagneticButton strength={20}>
                    <Link
                      href="#"
                      className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                    >
                      Register Now
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>

            {/* Event Card 2 */}
            <motion.div
              className="event-card glass-card-event"
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
            >
              <div className="h-48 bg-gray-700 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Capture Craft"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Capture Craft</h3>
                <p className="text-gray-300 mb-3">
                  48-hour coding challenge to build innovative solutions for real-world problems.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>April 20-22, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Margashri</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>IRIS Society</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MagneticButton strength={20}>
                    <Link
                      href="#"
                      className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Know More
                    </Link>
                  </MagneticButton>
                  <MagneticButton strength={20}>
                    <Link
                      href="#"
                      className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                    >
                      Register Now
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>

            {/* Event Card 3 */}
            <motion.div
              className="event-card glass-card-event"
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              style={{ y: useTransform(scrollYProgress, [0, 1], [70, -20]) }}
            >
              <div className="h-48 bg-gray-700 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Visual Voices"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Visual Voices</h3>
                <p className="text-gray-300 mb-3">
                  48-hour coding challenge to build innovative solutions for real-world problems.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>April 20-22, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Margashri</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>IRIS Society X Aayam Society</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MagneticButton strength={20}>
                    <Link
                      href="#"
                      className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Know More
                    </Link>
                  </MagneticButton>
                  <MagneticButton strength={20}>
                    <Link
                      href="#"
                      className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                    >
                      Register Now
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          ref={previousRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isPreviousInView ? "visible" : "hidden"}
          style={{ y: y2 }}
        >
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-700">Previous Events</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={cardContainerVariants}
            initial="hidden"
            animate={isPreviousInView ? "visible" : "hidden"}
          >
            {/* Previous Event Cards */}
            <motion.div
              className="event-card glass-card-event col-span-1 md:col-span-1"
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="h-48 bg-gray-700 relative">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Festive Frames: Diwali Unfiltered"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Festive Frames: Diwali Unfiltered</h3>
                <p className="text-gray-300 mb-3 text-sm">Hands-on design workshop for creative enthusiasts.</p>
                <div className="space-y-1 text-xs text-gray-400 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>29 Oct- 02 Nov, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2" />
                    <span>Online</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-2" />
                    <span>IRIS Society X Nandadap House</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MagneticButton strength={15}>
                    <Link
                      href="#"
                      className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Know More
                    </Link>
                  </MagneticButton>
                  <span className="text-xs px-2 py-1 bg-gray-600 text-gray-400 rounded-md">Registration Closed</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="event-card glass-card-event col-span-1 md:col-span-1"
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="h-48 bg-gray-700 relative">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Festive Frames: Dussehra Special"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Festive Frames: Dussehra Special</h3>
                <p className="text-gray-300 mb-3 text-sm">Hands-on design workshop for creative enthusiasts.</p>
                <div className="space-y-1 text-xs text-gray-400 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>09 Oct- 13 Oct, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2" />
                    <span>Online</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-2" />
                    <span>IRIS Society X Kanha House</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MagneticButton strength={15}>
                    <Link
                      href="#"
                      className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Know More
                    </Link>
                  </MagneticButton>
                  <span className="text-xs px-2 py-1 bg-gray-600 text-gray-400 rounded-md">Registration Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
      <Footer />
    </main>
  )
}
