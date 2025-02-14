"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Zap, ImageIcon, Layers, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 transition-colors duration-500">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-neon-purple dark:text-neon-pink"
          >
            AI Photo Gen
          </motion.div>
          <div className="space-x-4 flex items-center">
            <Link
              href="#features"
              className="text-gray-700 dark:text-gray-300 hover:text-neon-purple dark:hover:text-neon-pink transition-colors"
            >
              Features
            </Link>
            <Link
              href="#gallery"
              className="text-gray-700 dark:text-gray-300 hover:text-neon-purple dark:hover:text-neon-pink transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-700 dark:text-gray-300 hover:text-neon-purple dark:hover:text-neon-pink transition-colors"
            >
              Testimonials
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
        <GallerySection />
        <TestimonialsSection />
        <FeatureShowcase />
        <CTASection />
      </main>

      <footer className="bg-gray-100 dark:bg-black py-8 transition-colors duration-500">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          © 2025 AI Photo Gen. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-blue"
      >
        Create Stunning Images with AI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xl text-gray-700 dark:text-gray-300 mb-8"
      >
        Transform your ideas into beautiful visuals in seconds with our advanced AI technology.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Link
          href="#"
          className="bg-neon-purple text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-neon-pink transition duration-300 inline-flex items-center"
        >
          Get Started <ArrowRight className="ml-2" />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16"
      >
        <Image
          src="https://images.unsplash.com/photo-1638913662180-afc4334cf422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="AI Generated Image Example"
          width={1000}
          height={500}
          className="rounded-lg shadow-2xl mx-auto"
        />
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-neon-pink" />,
      title: "Lightning Fast",
      description: "Generate high-quality images in seconds with our optimized AI models.",
    },
    {
      icon: <ImageIcon className="w-12 h-12 text-neon-blue" />,
      title: "Diverse Styles",
      description: "Choose from a wide range of artistic styles and customize to your liking.",
    },
    {
      icon: <Layers className="w-12 h-12 text-neon-purple" />,
      title: "Advanced Editing",
      description: "Fine-tune your generated images with our intuitive editing tools.",
    },
  ]

  return (
    <section id="features" className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
      >
        Powerful Features
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function GallerySection() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1638913662180-afc4334cf422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      alt: "AI Generated Landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1638913662295-9630035ef770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      alt: "AI Generated Portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1638913662529-1d2f1eb5b526?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      alt: "AI Generated Abstract Art",
    },
    {
      src: "https://images.unsplash.com/photo-1638913662735-a13cfc1dd8d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      alt: "AI Generated Product Design",
    },
  ]

  return (
    <section id="gallery" className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
      >
        Image Gallery
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group overflow-hidden rounded-lg"
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={500}
              height={500}
              className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition duration-300 flex items-end justify-center pb-4">
              <p className="text-white text-center font-semibold">{image.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah L.",
      role: "Graphic Designer",
      content:
        "AI Photo Gen has revolutionized my workflow. I can now create stunning visuals in a fraction of the time!",
    },
    {
      name: "Mike R.",
      role: "Marketing Manager",
      content: "The diversity of styles and ease of use make this tool indispensable for our marketing campaigns.",
    },
    {
      name: "Emily T.",
      role: "Artist",
      content:
        "As an artist, I was skeptical at first, but AI Photo Gen has become an invaluable tool for inspiration and ideation.",
    },
  ]

  return (
    <section id="testimonials" className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-neon-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.name[0]}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureShowcase() {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
      >
        How It Works
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="text-2xl font-semibold mb-4 text-neon-purple dark:text-neon-pink">Describe Your Vision</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Simply describe the image you want to create using natural language. Our AI understands context, style, and
            complex visual concepts.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Detailed text-to-image generation</li>
            <li>Support for various artistic styles</li>
            <li>Context-aware image creation</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Image
            src="https://images.unsplash.com/photo-1638913662504-1fba673e07a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="AI Image Generation Process"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-blue opacity-20 rounded-lg"></div>
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-neon-purple to-neon-pink text-white py-16"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Create Amazing Images?</h2>
        <p className="text-xl mb-8">Join thousands of creators and start generating stunning visuals today.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="#"
            className="bg-white text-neon-purple px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 inline-flex items-center"
          >
            Start Free Trial <ArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

