import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GamePopupProps {
  show: boolean;
  message: string;
  onClose: () => void;
  autoCloseDelay?: number;
}

const GamePopup = ({ show, message, onClose, autoCloseDelay = 3000 }: GamePopupProps) => {
  useEffect(() => {
    if (show) {
      // Auto-close after specified delay (1.5 seconds for draws, 3 seconds for others)
      const delay = message.includes("draw") ? 1500 : autoCloseDelay;
      const timer = setTimeout(() => {
        onClose();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, message, autoCloseDelay]);

  if (!show) return null;

  const isDraw = message.includes("draw");
  const isSeriesComplete = message.includes("series") || message.includes("match");

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className={`bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-xl max-w-sm w-full ${
            isDraw ? 'border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' : 
            isSeriesComplete ? 'border-2 border-purple-400' : 
            'border-2 border-blue-400'
          }`}
          initial={{ scale: 0.7, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -10 }}
          transition={{ 
            duration: isDraw ? 0.3 : 0.4,
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
        >
          <motion.div 
            className={`text-2xl font-bold mb-4 ${
              isDraw 
                ? 'text-yellow-600 dark:text-yellow-400' 
                : isSeriesComplete
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-800 dark:text-white'
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {message}
          </div>
          
          {/* Show different styling for draw messages */}
          {isDraw && (
            <motion.div 
              className="text-sm text-yellow-600 dark:text-yellow-400 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              All squares filled - no winner this round!
            </motion.div>
          )}
          
          {/* Show series completion info */}
          {isSeriesComplete && (
            <motion.div 
              className="text-sm text-purple-600 dark:text-purple-400 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Series complete!
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button
              onClick={onClose}
              className={`px-6 py-2 rounded-lg ${
                isDraw 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : isSeriesComplete
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GamePopup;