import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";

import Button from "../components/ui/Button";
import onboardingData from "../data/onboardingData";

const Onboarding = () => {
  const navigate = useNavigate();

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex === onboardingData.length - 1) {
      navigate("/register");
    } else {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="h-screen bg-[#0B0B0F] overflow-hidden">
      <Swiper
        modules={[Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full"
      >
        {onboardingData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-screen">

              {/* Background Image */}

              <motion.img
                src={slide.image}
                alt={slide.title}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 6,
                  ease: "easeOut",
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/60 to-transparent" />

              {/* Skip Button */}

              <button
                onClick={() => navigate("/login")}
                className="absolute top-8 right-6 z-50 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Skip
              </button>

              {/* Bottom Content */}

              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="absolute bottom-0 z-40 w-full px-6 pb-12 md:pb-14"
              >
                {/* Logo */}

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-xl font-bold mb-6"
                >
                  Event <span className="text-[#FF6B6B]">Buddy</span>
                </motion.h2>

                {/* Title */}

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-5xl font-black tracking-tight leading-[1.1] whitespace-pre-line"
                >
                  {slide.title}
                </motion.h1>

                {/* Description */}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="text-gray-300 text-lg leading-8 mt-5"
                >
                  {slide.description}
                </motion.p>

                {/* Last Slide Message */}

                {activeIndex === onboardingData.length - 1 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="text-center text-gray-300 mt-8"
                  >
                    Ready to find your next adventure?
                  </motion.p>
                )}

                {/* Indicators */}

                <div className="flex justify-center gap-2 mt-8 mb-8">
                  {onboardingData.map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-full transition-all duration-500 ease-in-out ${
                        activeIndex === index
                          ? "w-8 h-2 bg-[#FF6B6B]"
                          : "w-2 h-2 bg-gray-500"
                      }`}
                    />
                  ))}
                </div>

                {/* Button */}

                <Button
  onClick={handleNext}
  variant={activeIndex === onboardingData.length - 1 ? "gold" : "primary"}
  className="flex items-center justify-center gap-2"
>
  {activeIndex === onboardingData.length - 1 ? "Let's Go" : "Next"}

  <MoveRight size={18} strokeWidth={2.5} />
</Button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Onboarding;