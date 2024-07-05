'use client'
import Image from 'next/image'

interface ImageProps {
  className?: string
  width?: number
  height?: number
  src: string
  alt: string
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill'
}

export default function VImage(props: ImageProps) {
  return (
    <Image
      width={props.width}
      height={props.height}
      className={props.className}
      src={props.src}
      alt={props.alt}
      layout={props.layout}
    />
  )
}
