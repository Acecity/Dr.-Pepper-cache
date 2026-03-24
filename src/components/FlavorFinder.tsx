import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FlavorFinder = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ classic: 0, bold: 0, sweet: 0, smooth: 0 });
  const [result, setResult] = useState<{ name: string; desc: string; color: string } | null>(null);

  const questions = [
    {
      question: "What's your current energy level?",
      options: [
        { text: "Main Character Energy", points: { bold: 3, classic: 1 } },
        { text: "Smooth & Chilled", points: { smooth: 3, sweet: 1 } },
        { text: "Pure Chaos (The Good Kind)", points: { classic: 3, bold: 2 } },
      ]
    },
    {
      question: "Pick your afternoon vibe:",
      options: [
        { text: "Classic Backyard BBQ", points: { classic: 3, smooth: 1 } },
        { text: "Gaming Marathons", points: { bold: 3, sweet: 1 } },
        { text: "Dessert for Dinner", points: { sweet: 3, smooth: 2 } },
      ]
    },
    {
      question: "How do you handle the 'fizz'?",
      options: [
        { text: "I want the bite!", points: { bold: 3, classic: 2 } },
        { text: "Make it creamy.", points: { smooth: 3, sweet: 2 } },
        { text: "Just give me the original.", points: { classic: 3 } },
      ]
    }
  ];

  const handleAnswer = (points: Record<string, number>) => {
    const newScores = { ...scores };
    Object.keys(points).forEach(key => {
      // @ts-ignore
      newScores[key] += points[key];
    });
    setScores(newScores);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: typeof scores) => {
    const winner = Object.keys(finalScores).reduce((a, b) => 
      // @ts-ignore
      finalScores[a] > finalScores[b] ? a : b
    ) as keyof typeof products;
    
    const products = {
      classic: { name: "Dr Pepper Original", desc: "The OG. 23 flavors of perfection.", color: "#711F25" },
      bold: { name: "Dr Pepper Cherry", desc: "For those who want a little extra edge.", color: "#4A0E0E" },
      sweet: { name: "Dr Pepper Strawberries & Cream", desc: "A smooth, berry-infused dream.", color: "#D64550" },
      smooth: { name: "Dr Pepper & Cream Soda", desc: "Two legends, one incredibly smooth finish.", color: "#E3B448" }
    };
    
    setResult(products[winner]);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-[#711F25] text-white rounded-3xl shadow-2xl border-4 border-[#A32A31] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
      
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
                Find Your Flavor
              </h2>
              <p className="text-white/60 text-sm uppercase tracking-widest font-bold">The Dr Pepper Experience</p>
            </div>

            <div className="h-2 w-full bg-[#4A0E0E] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="py-4">
              <p className="text-2xl font-bold text-center mb-8 leading-tight">
                {questions[step].question}
              </p>
              <div className="grid gap-4">
                {questions[step].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, backgroundColor: '#F2D2D5' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt.points)}
                    className="py-5 px-6 bg-white text-[#711F25] font-black rounded-2xl transition-colors text-xl shadow-lg text-left flex justify-between items-center group"
                  >
                    <span>{opt.text}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="text-center text-white/40 text-xs font-bold uppercase tracking-widest">
              Question {step + 1} of {questions.length}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-4"
          >
            <div className="space-y-2">
              <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-white/70">Your Perfect Match</h3>
              <h2 className="text-5xl font-black italic uppercase leading-none tracking-tighter">
                {result.name}
              </h2>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div 
                className="w-48 h-48 mx-auto rounded-full border-8 border-white/20 shadow-2xl flex items-center justify-center text-7xl relative z-10"
                style={{ backgroundColor: result.color }}
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🥤
                </motion.span>
              </div>
              {/* Glow effect */}
              <div 
                className="absolute inset-0 blur-3xl opacity-30 rounded-full scale-150"
                style={{ backgroundColor: result.color }}
              />
            </motion.div>

            <p className="text-2xl font-medium px-4 leading-relaxed">
              {result.desc}
            </p>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStep(0);
                  setScores({ classic: 0, bold: 0, sweet: 0, smooth: 0 });
                  setResult(null);
                }}
                className="py-4 px-10 bg-white text-[#711F25] font-black rounded-full shadow-xl hover:shadow-2xl transition-all uppercase tracking-widest text-sm"
              >
                Find Another Flavor
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlavorFinder;
