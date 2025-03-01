"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const CAPTCHA_STYLES = {
  CLASSIC: {
    font: 'bold 24px sans-serif',
    distortionLevel: 0.4,
    lineCount: 8,
    dotCount: 50,
  },
  WAVY: {
    font: 'bold 28px cursive',
    distortionLevel: 0.6,
    lineCount: 12,
    dotCount: 100,
  },
  MATRIX: {
    font: '26px "Courier New"',
    distortionLevel: 0.3,
    lineCount: 15,
    dotCount: 75,
  },
  BUBBLE: {
    font: 'bold 30px Arial',
    distortionLevel: 0.5,
    lineCount: 6,
    dotCount: 40,
  }
};

const CustomCaptcha = ({ onVerify }) => {
  const canvasRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [currentStyle, setCurrentStyle] = useState("CLASSIC");
  const [token, setToken] = useState("");
  const [behaviorMetrics, setBehaviorMetrics] = useState({
    keyPressTimings: [],
    mouseMovements: [],
    totalTime: 0
  });
  const startTimeRef = useRef(Date.now());
  const lastKeyPressRef = useRef(Date.now());
  const mouseMovementsRef = useRef([]);

  // Génération de token unique pour chaque CAPTCHA
  const generateToken = () => {
    const newToken = uuidv4();
    setToken(newToken);
    return newToken;
  };

  // Génération du texte du CAPTCHA
  const generateCaptchaText = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%';
    let text = '';
    // Génère une chaîne de 6 caractères sans espace
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      text += chars.charAt(randomIndex);
    }
    return text;
  };
  // Surveillance des mouvements de souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseMovementsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const drawCaptchaWithStyle = (text, style) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const styleConfig = CAPTCHA_STYLES[style];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fond avec effet selon le style
    switch(style) {
      case 'MATRIX':
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < canvas.width; i += 10) {
          ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.5})`;
          ctx.fillRect(i, 0, 2, canvas.height);
        }
        break;
        
      case 'WAVY':
        for (let i = 0; i < canvas.width; i += 2) {
          ctx.beginPath();
          ctx.moveTo(i, Math.sin(i/10) * 10 + canvas.height/2);
          ctx.lineTo(i, canvas.height);
          ctx.strokeStyle = `rgba(0, 0, 255, 0.1)`;
          ctx.stroke();
        }
        break;
        
      case 'BUBBLE':
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = Math.random() * 20;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 100, 255, 0.1)`;
          ctx.fill();
        }
        break;
        
      default:
        for (let i = 0; i < canvas.width; i += 4) {
          for (let j = 0; j < canvas.height; j += 4) {
            ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.1)`;
            ctx.fillRect(i, j, 4, 4);
          }
        }
    }

    // Lignes de distraction
    for (let i = 0; i < styleConfig.lineCount; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = style === 'MATRIX' 
        ? `rgba(0, 255, 0, ${Math.random()})` 
        : `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;
      ctx.stroke();
    }

    // Configuration du texte
    ctx.font = styleConfig.font;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // Dessin des caractères avec effets
 for (let i = 0; i < text.length; i++) {
    ctx.save();
    // Réduire l'espacement entre les caractères en diminuant la multiplication par 25
    ctx.translate(20 + i * 20, canvas.height / 2); // Changé de 25 à 20
    ctx.rotate((Math.random() - 0.5) * styleConfig.distortionLevel);
    
    if (style === 'MATRIX') {
      ctx.fillStyle = `rgb(0, ${150 + Math.random() * 105}, 0)`;
      ctx.shadowColor = 'rgba(0, 255, 0, 0.8)';
      ctx.shadowBlur = 5;
    } else {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }
    
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
    // Points de distraction
    for (let i = 0; i < styleConfig.dotCount; i++) {
      ctx.fillStyle = style === 'MATRIX' 
        ? `rgba(0, 255, 0, ${Math.random()})` 
        : `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`;
      ctx.fillRect(
        Math.random() * canvas.width, 
        Math.random() * canvas.height, 
        2, 
        2
      );
    }
  };

  const analyzeUserBehavior = () => {
    const currentTime = Date.now();
    const totalTime = currentTime - startTimeRef.current;
    const mouseMovements = mouseMovementsRef.current;
    
    const isNaturalMouseMovement = mouseMovements.length > 2;
    
    let isNaturalTyping = true;
    if (behaviorMetrics.keyPressTimings.length > 0) {
      const avgKeyTiming = behaviorMetrics.keyPressTimings.reduce((a, b) => a + b, 0) / 
                          behaviorMetrics.keyPressTimings.length;
      isNaturalTyping = avgKeyTiming > 10 && avgKeyTiming < 2000;
    }
    
    const isReasonableTime = totalTime > 500 && totalTime < 60000;

    console.log({
      mouseMovements: mouseMovements.length,
      keyTimings: behaviorMetrics.keyPressTimings,
      totalTime,
      isNaturalMouseMovement,
      isNaturalTyping,
      isReasonableTime
    });

    const validCriteria = [isNaturalMouseMovement, isNaturalTyping, isReasonableTime];
    const validCount = validCriteria.filter(Boolean).length;
    
    return validCount >= 2;
  };

  const handleKeyPress = (e) => {
    const currentTime = Date.now();
    const timingSinceLastPress = currentTime - lastKeyPressRef.current;
    
    if (lastKeyPressRef.current !== startTimeRef.current) {
      setBehaviorMetrics(prev => ({
        ...prev,
        keyPressTimings: [...prev.keyPressTimings, timingSinceLastPress]
      }));
    }
    
    lastKeyPressRef.current = currentTime;
  };

  const refreshCaptcha = () => {
    const newText = generateCaptchaText();
    const newToken = generateToken();
    const newStyle = Object.keys(CAPTCHA_STYLES)[
      Math.floor(Math.random() * Object.keys(CAPTCHA_STYLES).length)
    ];
    
    setCaptchaText(newText);
    setCurrentStyle(newStyle);
    drawCaptchaWithStyle(newText, newStyle);
    setUserInput("");
    setIsValid(false);
    onVerify(false);
    
    startTimeRef.current = Date.now();
    lastKeyPressRef.current = Date.now();
    mouseMovementsRef.current = [];
    setBehaviorMetrics({
      keyPressTimings: [],
      mouseMovements: [],
      totalTime: 0
    });
  };

  const verifyCaptcha = () => {
    const isHumanBehavior = analyzeUserBehavior();
    const isCorrectText = userInput === captchaText;
    
    if (!isHumanBehavior) {
      toast.error("Comportement suspect détecté. Veuillez réessayer normalement.");
      console.log("Captcha actuel:", captchaText);
      refreshCaptcha();
      return;
    }
    
    setIsValid(isCorrectText);
    onVerify(isCorrectText);
    
    if (!isCorrectText) {
      toast.error("Texte incorrect. Veuillez réessayer.");
      refreshCaptcha();
    } else {
      toast.success("Vérification réussie !");
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className="w-full max-w-[70%] p-4 bg-white rounded-lg shadow-md">
      <canvas
        ref={canvasRef}
        width="180"
        height="60"
        className="mb-4 border border-gray-200 rounded"
      />
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Entrez le texte"
        />
        <Button
          type="button"
          onClick={refreshCaptcha}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          ↻
        </Button>
      </div>
      <Button
        type="button"
        onClick={verifyCaptcha}
        className={`w-full ${
          isValid ? "bg-green-500" : "bg-[#4318FF]"
        } text-white rounded`}
      >
        Vérifier
      </Button>
    </div>
  );
};

export default CustomCaptcha;