"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

type CarouselProps = {
    children: React.ReactNode[]
}

export const HorizontalCarousel = ({ children }: CarouselProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [dragLimit, setDragLimit] = useState(0)
    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return

        const containerWidth = containerRef.current.offsetWidth
        const contentWidth = contentRef.current.scrollWidth
        console.log("contentWidth :", contentWidth,"containerWidth :", containerWidth,)
        const maxDrag = contentWidth - containerWidth
        setDragLimit(maxDrag > 0 ? maxDrag : 0)
    }, [children])

    return (
        <div ref={containerRef} className="overflow-hidden w-full lg:hidden">
            <motion.div
                ref={contentRef}
                className="flex gap-4 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -dragLimit, right: 0 }}
                style={{ width: "max-content" }}
            >
                {children.map((child, index) => (
                    <motion.div key={index}>
                        {child}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
