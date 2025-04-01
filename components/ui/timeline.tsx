// components/ui/timeline.tsx
'use client'

import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TimelineItemProps {
  status: 'terminée' | 'échouée' | 'en cours'
  title: string
  date: string
  duration?: string
  children?: ReactNode
}

export function TimelineItem({ status, title, date, duration, children }: TimelineItemProps) {
  const statusIcon =
    status === 'terminée' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> :
    status === 'échouée' ? <XCircle className="w-4 h-4 text-red-500" /> :
    <Clock className="w-4 h-4 text-yellow-500" />

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative pl-6 border-l border-muted-foreground/20 ml-2"
    >
      <div className="absolute -left-[10px] top-1.5 bg-background rounded-full p-1">
        {statusIcon}
      </div>
      <div className="mb-2">
        <div className="font-medium leading-tight text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">
          {date} {duration && <>• <span>{duration}</span></>}
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {children}
      </div>
    </motion.div>
  )
}

interface TimelineProps {
  children: ReactNode
}

export function Timeline({ children }: TimelineProps) {
  return <div className="space-y-4 relative">{children}</div>
}
