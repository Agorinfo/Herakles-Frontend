"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

type CarouselProps = {
    children: React.ReactNode[]
}

export const VerticalCarousel = ({ children }: CarouselProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [constraints, setConstraints] = useState({ top: 0, bottom: 0 })

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return
        const containerHeight = containerRef.current.offsetHeight
        const contentHeight = contentRef.current.scrollHeight
        setConstraints({
            top: -(contentHeight - containerHeight),
            bottom: 0,
        })
    }, [children])

    return (
        <div ref={containerRef} className="overflow-hidden h-[40rem] pr-2">
            <motion.div
                ref={contentRef}
                className="flex flex-col gap-4 cursor-grab active:cursor-grabbing"
                drag="y"
                dragConstraints={constraints}
            >
                {children.map((child, i) => (
                    <motion.div key={i}>{child}</motion.div>
                ))}
            </motion.div>
        </div>
    )
}
