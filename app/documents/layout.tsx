'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const DocumentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="relative bg-cover bg-center bg-no-repeat min-h-screen"
                style={{ backgroundImage: "url('/result-background.png')" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>

                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default DocumentLayout;


