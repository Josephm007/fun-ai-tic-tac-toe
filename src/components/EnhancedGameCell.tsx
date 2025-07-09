
import { useState } from "react";
import { motion } from "framer-motion";
import { Player } from "@/utils/aiLogic";
import { IconStyle } from "@/services/settingsService";

interface EnhancedGameCellProps {
  value: Player;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
  iconStyle: IconStyle;
  currentPlayer: Player;
  previewEnabled?: boolean;
}

const getIconDisplay = (player: Player, iconStyle: IconStyle): string => {
  if (player === '') return '';
  
  switch (iconStyle) {
    case 'emoji':
      return player === 'X' ? '❌' : '⭕';
    case 'modern':
      return player === 'X' ? '✖' : '○';
    case 'classic':
    default:
      return player;
  }
};

const EnhancedGameCell = ({ 
  value, 
  onClick, 
  isWinning, 
  disabled, 
  iconStyle, 
  currentPlayer,
  previewEnabled = true 
}: EnhancedGameCellProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const showPreview = previewEnabled && isHovered && value === '' && !disabled;
  const displayValue = showPreview 
    ? getIconDisplay(currentPlayer, iconStyle)
    : getIconDisplay(value, iconStyle);

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      animate={isWinning ? { 
        scale: [1, 1.1, 1], 
        boxShadow: [
          "0 0 0 rgba(34, 197, 94, 0)",
          "0 0 20px rgba(34, 197, 94, 0.5)",
          "0 0 0 rgba(34, 197, 94, 0)"
        ]
      } : {}}
      transition={isWinning ? { 
        duration: 0.6, 
        repeat: Infinity,
        ease: "easeInOut"
      } : { 
        duration: 0.2 
      }}
      className={`
        w-20 h-20 sm:w-24 sm:h-24 
        flex items-center justify-center 
        text-2xl sm:text-3xl font-bold 
        rounded-lg border-2 border-gray-300 dark:border-gray-600
        transition-colors duration-300 ease-in-out
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        ${isWinning ? 'bg-green-400 border-green-500 text-white animate-pulse' : 
          'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'}
        ${showPreview ? 'bg-gray-100 dark:bg-gray-700' : ''}
      `}
    >
      <motion.span 
        className={`
          transition-all duration-200
          ${value === 'X' ? 'text-blue-600 dark:text-blue-400' : 
            value === 'O' ? 'text-red-600 dark:text-red-400' : ''}
          ${showPreview ? 'opacity-50 scale-90' : ''}
        `}
        initial={value && !showPreview ? { scale: 0, opacity: 0 } : {}}
        animate={value && !showPreview ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, ease: "backOut" }}
      >
        {displayValue}
      </motion.span>
    </motion.button>
  );
};

export default EnhancedGameCell;
