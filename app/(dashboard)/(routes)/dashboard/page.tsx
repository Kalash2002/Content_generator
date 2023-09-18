"use client"
import { UserButton } from '@clerk/nextjs';
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation';


export const tool = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];

const DashBoardpage = () => {
  const router = useRouter();
  return (
    <div>
        <div className='mb-8 space-y-4'>
          <h2 className='text-2xl md:text-4xl font-bold text-center'>
            Explore the power of AI
          </h2>
          <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
            Give prompt and get content from AI
          </p>
        </div>
        <div className='px-4 md:px-20 lg:px-32 space-y-4'>
         {tool.map((tool)=>(
          <Card onClick={()=> router.push(tool.href)} key={tool.href} className='p-2 bg-white/90 border-white/90 flex items-center justify-between hover:shadow-md transition cursor-pointer opacity-0.9'>
           <div className='flex items-center gap-x-4'>
            <div className={cn("p-1 w-fit rounded-md",tool.bgColor)}>
              <tool.icon className={cn("w-6 h-6",tool.color)}/>
            </div>
            <div className='font-semibold'>
              {tool.label}
            </div>
           </div>
           <ArrowRight/>
          </Card>
         ))}
        </div>
    </div>
  )
}

export default DashBoardpage;
