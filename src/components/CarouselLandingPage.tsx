import * as React from "react"
 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
export default function CarouselSize() {
   
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
          <CarouselItem  className=" lg:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <img src={'/amazon.jpg'} alt={`Image}`} className="object-cover " />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem  className=" lg:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <img src={'/microsoft.png'} alt={`Image}`} className="object-cover " />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem  className=" lg:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <img src={'/meta.jpg'} alt={`Image}`} className="object-cover " />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem  className=" lg:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <img src={'/google.jpg'} alt={`Image}`} className="object-cover " />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem  className=" lg:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <img src={'/nvidia.png'} alt={`Image}`} className="object-cover " />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}