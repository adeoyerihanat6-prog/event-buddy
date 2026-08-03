import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";

import AppLayout from "../components/ui/AppLayout";
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
    <AppLayout noHeader noBottomNav>
      <div className="absolute inset-0 h-screen w-screen overflow-hidden bg-[#0B0B0F]">
        <Swiper
          modules={[Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full w-full"
        >
          {onboardingData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full flex flex-col justify-end">

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
                  className="absolute top-6 right-6 z-50 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 active:scale-95"
                >
                  Skip
                </button>

                {/* Bottom Content */}
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="relative z-40 w-full px-6 pb-8 pt-10"
                >
                  {/* Logo */}
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-white text-base font-bold mb-2.5"
                  >
                    Event <span className="text-[#FF6B6B]">Buddy</span>
                  </motion.h2>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-white text-2xl font-black tracking-tight leading-[1.1] whitespace-pre-line select-text"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-gray-300 text-xs leading-relaxed mt-2.5 select-text"
                  >
                    {slide.description}
                  </motion.p>

                  {/* Last Slide Message */}
                  {activeIndex === onboardingData.length - 1 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                      className="text-center text-gray-300 text-[11px] mt-3"
                    >
                      Ready to find your next adventure?
                    </motion.p>
                  )}

                  {/* Indicators */}
                  <div className="flex justify-center gap-1.5 my-4">
                    {onboardingData.map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-full transition-all duration-500 ease-in-out ${
                          activeIndex === index
                            ? "w-5 h-1.5 bg-[#FF6B6B]"
                            : "w-1.5 h-1.5 bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Button */}
                  <Button
                    onClick={handleNext}
                    variant={activeIndex === onboardingData.length - 1 ? "gold" : "primary"}
                    className="flex items-center justify-center gap-2 w-full py-3 text-xs rounded-xl shadow-lg active:scale-[0.98]"
                  >
                    {activeIndex === onboardingData.length - 1 ? "Let's Go" : "Next"}
                    <MoveRight size={15} strokeWidth={2.5} />
                  </Button>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </AppLayout>
  );
};

export default Onboarding;