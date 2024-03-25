"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="theme-switcher">
            <div className="display">
                <input type="checkbox" id="toggle" onChange={toggleTheme} checked={theme === 'dark'} />
                <label htmlFor="toggle" className="toggle-label">
                    <div className="circle">
                        <FiSun className="sun" />
                        <FiMoon className="moon" />
                    </div>
                </label>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
