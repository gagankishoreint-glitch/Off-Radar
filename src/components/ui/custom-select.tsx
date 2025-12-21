"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    label?: string;
    className?: string;
}

export function CustomSelect({
    options,
    value,
    onChange,
    placeholder = "Select...",
    icon,
    label,
    className
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <div className={cn("relative", className)} ref={dropdownRef}>
            {label && (
                <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                    {icon}
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full px-3 py-2.5 text-sm rounded-xl border border-border bg-background text-foreground",
                    "flex items-center justify-between gap-2",
                    "hover:bg-muted/50 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-foreground/20",
                    isOpen && "ring-2 ring-foreground/20"
                )}
            >
                <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
                    {selectedOption?.label || placeholder}
                </span>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 py-1 bg-background border border-border rounded-xl shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
                    <div className="max-h-60 overflow-auto">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full px-3 py-2.5 text-sm text-left flex items-center justify-between",
                                    "hover:bg-muted transition-colors",
                                    value === option.value && "bg-muted"
                                )}
                            >
                                <span>{option.label}</span>
                                {value === option.value && (
                                    <Check className="w-4 h-4 text-foreground" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
