
import React from 'react';
import { Theme } from '../types/resume';
import { Palette, Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const themes: { value: Theme; label: string; description: string; icon: React.ReactNode; preview: string }[] = [
    { 
      value: 'light', 
      label: 'Light', 
      description: 'Clean and minimal',
      icon: <Sun className="w-5 h-5" />,
      preview: 'bg-white border-gray-200'
    },
    { 
      value: 'modern', 
      label: 'Modern', 
      description: 'Professional with color',
      icon: <Sparkles className="w-5 h-5" />,
      preview: 'bg-gradient-to-r from-blue-500 to-purple-600'
    },
    { 
      value: 'dark', 
      label: 'Dark', 
      description: 'Elegant dark theme',
      icon: <Moon className="w-5 h-5" />,
      preview: 'bg-gray-900 border-gray-700'
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 card-hover">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 gradient-primary rounded-lg">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Choose Theme</h3>
          <p className="text-sm text-gray-600">Select your resume style</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => onThemeChange(theme.value)}
            className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              currentTheme === theme.value
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
                : 'border-gray-200 hover:border-primary/50 bg-white/50'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-12 h-8 rounded-lg ${theme.preview} flex items-center justify-center`}>
                <div className="text-white opacity-80">
                  {theme.icon}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-semibold ${
                  currentTheme === theme.value ? 'text-primary' : 'text-gray-900'
                }`}>
                  {theme.label}
                </div>
                <div className="text-xs text-gray-600 mt-1">{theme.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
