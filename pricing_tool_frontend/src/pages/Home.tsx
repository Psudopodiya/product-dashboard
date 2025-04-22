import logo from "@/assets/logo.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CardData } from "@/constants/const";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 flex flex-col justify-between max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-6 md:mb-8">
        <img
          src={logo || "/placeholder.svg"}
          alt="BCGX Logo"
          className="h-8 md:h-10 lg:h-12"
        />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center gap-3 md:gap-5 mb-8 md:mb-12 lg:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Price Optimization Tool
        </h1>
        <p className="text-gray-400 max-w-md md:max-w-xl lg:max-w-2xl mx-auto text-center text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 justify-items-center">
        {CardData.map((card, index) => {
          return (
            <Card
              key={index}
              onClick={() => navigate(card.link)}
              className="w-full max-w-md cursor-pointer hover:shadow-lg hover:scale-105 transition-transform ease-in-out duration-300"
            >
              <CardHeader className="flex justify-center md:justify-start">
                <div>
                  <img
                    src={card.icon || "/placeholder.svg"}
                    alt={card.title}
                    className="h-16 md:h-20 lg:h-24 object-contain"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 h-full items-start">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 text-left">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground text-left">
                  {card.description}
                </p>
              </CardContent>
              <CardFooter>
                <div className="text-left">
                  <span className="text-xl md:text-2xl">→</span>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}