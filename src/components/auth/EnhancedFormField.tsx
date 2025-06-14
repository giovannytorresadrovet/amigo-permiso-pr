
import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface EnhancedFormFieldProps {
  field: any;
  type?: string;
  placeholder?: string;
  label: string;
  showPasswordToggle?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const EnhancedFormField: React.FC<EnhancedFormFieldProps> = ({
  field,
  type = 'text',
  placeholder,
  label,
  showPasswordToggle = false,
  error,
  className = '',
  disabled = false,
  children
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <FormItem className={className}>
      <FormLabel className={`text-slate-300 transition-colors ${isFocused ? 'text-blue-400' : ''}`}>
        {label}
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            {...field}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 
              transition-all duration-200 
              ${isFocused ? 'border-blue-500 ring-1 ring-blue-500/50' : ''}
              ${error ? 'border-red-500' : ''}
              ${showPasswordToggle ? 'pr-10' : ''}
            `}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
              disabled={disabled}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
          )}
        </div>
      </FormControl>
      {children}
      <FormMessage />
    </FormItem>
  );
};
