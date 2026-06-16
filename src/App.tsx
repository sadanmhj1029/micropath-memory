/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, 
  Microscope, 
  RefreshCw, 
  Trophy, 
  Info, 
  CheckCircle2, 
  BrainCircuit,
  Stethoscope,
  BookOpen,
  Search,
  X
} from 'lucide-react';
import { CardData, GameState, Difficulty } from './types';
import { shuffleCards, MICRO_PATH_DATA } from './constants';

const Card: React.FC<{
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  canFlip: boolean;
  onClick: () => void;
}> = ({ card, isFlipped, isMatched, canFlip, onClick }) => {
  const isDisabled = isMatched || isFlipped || !canFlip;

  return (
    <motion.div 
      className={`relative h-60 w-full perspective-1000 ${
        isMatched ? 'cursor-default' : 
        (isFlipped || !canFlip) ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={onClick}
      whileHover={isDisabled ? {} : { scale: 1.05 }}
      whileTap={isDisabled ? { x: [0, -2, 2, -2, 2, 0] } : { scale: 0.95 }}
      transition={isDisabled ? { duration: 0.2 } : {}}
    >
      <motion.div
        className="relative h-full w-full transition-all duration-500 preserve-3d"
        animate={{ 
          rotateY: isFlipped || isMatched ? 180 : 0,
          scale: isMatched ? [1, 1.1, 1] : 1,
          boxShadow: isMatched 
            ? "0 0 20px rgba(16, 185, 129, 0.4)" 
            : "0 0 0px rgba(0, 0, 0, 0)"
        }}
        transition={{ 
          rotateY: { duration: 0.6, type: "spring", stiffness: 260, damping: 20 },
          scale: { duration: 0.4, times: [0, 0.5, 1] },
          boxShadow: { duration: 0.4 }
        }}
      >
        {/* Front (Hidden) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 bg-slate-900 shadow-lg backface-hidden transition-opacity duration-300 ${
          !canFlip && !isFlipped && !isMatched ? 'border-slate-800 opacity-40' : 'border-emerald-500/20'
        }`}>
          <div className={`flex flex-col items-center gap-3 transition-colors duration-300 ${
            !canFlip && !isFlipped && !isMatched ? 'text-slate-700' : 'text-emerald-500/40'
          }`}>
            <BrainCircuit size={40} />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">MicroPath</span>
          </div>
        </div>

        {/* Back (Revealed) */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl p-3 text-center shadow-xl backface-hidden rotate-y-180 ${
            isMatched 
              ? 'border-2 border-emerald-500 bg-emerald-950/40 text-emerald-100' 
              : 'border-2 border-slate-700 bg-slate-800 text-slate-100'
          }`}
        >
          {isMatched && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-xl pointer-events-none"
            />
          )}
          
          <div className="relative z-10 w-full max-h-full flex flex-col justify-center overflow-y-auto no-scrollbar scroll-smooth">
            <div className="mb-1 text-[8px] font-bold uppercase tracking-tighter text-emerald-500/60 shrink-0">
              {card.topic}
            </div>
            <div className={`mb-1.5 text-sm font-medium leading-tight ${card.type === 'concept' ? 'font-serif italic text-base' : 'font-sans text-[13px] text-slate-300'}`}>
              {card.content}
            </div>
            {card.type === 'concept' && card.difficulty !== 'Hard' && (
              <div className="mt-2 border-t border-white/5 pt-2 text-[10px] leading-relaxed text-slate-400">
                {card.explanation}
              </div>
            )}
          </div>

          {isMatched && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1.5 right-1.5 z-20"
            >
              <CheckCircle2 size={14} className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const GlossaryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MICRO_PATH_DATA.filter(item => 
    item.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.explanation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500/20 p-3 text-emerald-500">
              <BookOpen size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-serif italic text-white">MicroPath Glossary</h2>
              <p className="text-[10px] uppercase tracking-widest text-emerald-500/60">Comprehensive Diagnostic Reference</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-white/5 p-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search concepts, topics, or explanations..."
              className="w-full rounded-xl border border-white/5 bg-white/5 py-3 pr-4 pl-12 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-emerald-500/30 hover:bg-white/[0.04]"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <span className="rounded-md bg-emerald-500/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-emerald-500">
                      {item.topic}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${
                      item.difficulty === 'Easy' ? 'text-emerald-400' : 
                      item.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <h3 className="mb-2 font-serif text-lg italic text-white group-hover:text-emerald-400 transition-colors">
                    {item.concept}
                  </h3>
                  <p className="mb-3 text-xs font-medium leading-relaxed text-slate-400">
                    {item.characteristic}
                  </p>
                  <div className="rounded-lg bg-black/40 p-3 text-[11px] leading-relaxed text-slate-500 italic">
                    {item.explanation}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500">No matching diagnostic terms found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 bg-white/5 p-4 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-600">
            Total Records: {filteredData.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InstructionsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl"
      >
        <div className="border-b border-slate-800 bg-slate-800/50 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-500">
              <Info size={24} />
            </div>
            <h2 className="text-2xl font-serif italic text-white">Lab Protocol</h2>
          </div>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
          <section className="space-y-2">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-500">
              <Trophy size={14} /> Objective
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Match each <span className="font-bold text-white">Microbial Concept</span> with its corresponding <span className="font-bold text-white">Characteristic</span>. Correct identification clears the board and provides detailed diagnostic insights.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-500">
              <BrainCircuit size={14} /> How to Play
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-emerald-500">1</span>
                <span>Click any card to reveal its hidden content.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-emerald-500">2</span>
                <span>Select a second card to attempt a match.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-emerald-500">3</span>
                <span>If they match, they stay revealed and award points. If not, they flip back.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-500">
              <Stethoscope size={14} /> Scoring & Difficulty
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-800/50 p-3">
                <span className="block text-[10px] uppercase tracking-widest text-slate-500">Match</span>
                <span className="text-sm font-bold text-emerald-400">+100 to +200 pts</span>
              </div>
              <div className="rounded-xl bg-slate-800/50 p-3">
                <span className="block text-[10px] uppercase tracking-widest text-slate-500">Miss</span>
                <span className="text-sm font-bold text-rose-400">-10 to -40 pts</span>
              </div>
            </div>
            <p className="text-xs italic text-slate-500">
              Higher difficulties offer larger rewards but carry heavier penalties for diagnostic errors. Consecutive matches grant a <span className="text-amber-400 font-bold">Streak Multiplier</span> (+25% per match).
            </p>
          </section>
        </div>

        <div className="bg-slate-800/30 p-6">
          <button 
            onClick={onClose}
            className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white transition-all hover:bg-emerald-500 active:scale-95"
          >
            Understood, Start Lab
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExplanationModal: React.FC<{
  card: CardData;
  onClose: () => void;
}> = ({ card, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-md rounded-3xl border border-emerald-500/30 bg-slate-900 p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-emerald-500/20 p-3 text-emerald-400">
            <Info size={24} />
          </div>
          <h2 className="text-2xl font-serif italic text-emerald-500">Medical Insight</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">Topic</span>
            <p className="text-lg font-medium text-slate-100">{card.topic}</p>
          </div>
          
          <div className="rounded-2xl bg-slate-800/50 p-4">
            <p className="text-sm leading-relaxed text-slate-300">
              {card.explanation}
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-bold text-white transition-all hover:bg-emerald-500 active:scale-95"
        >
          Continue Learning
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedIndices: [],
    matchedPairIds: [],
    moves: 0,
    score: 0,
    difficulty: 'Medium',
    isWon: false,
    showExplanation: null,
    streak: 0,
  });

  const [isSelectingDifficulty, setIsSelectingDifficulty] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const initGame = useCallback((difficulty: Difficulty = gameState.difficulty) => {
    setGameState({
      cards: shuffleCards(difficulty),
      flippedIndices: [],
      matchedPairIds: [],
      moves: 0,
      score: 0,
      difficulty,
      isWon: false,
      showExplanation: null,
      streak: 0,
    });
    setIsSelectingDifficulty(false);
  }, [gameState.difficulty]);

  const handleCardClick = (index: number) => {
    const { flippedIndices, matchedPairIds, cards, moves } = gameState;

    // Ignore if already flipped, matched, or two cards already flipped
    if (
      flippedIndices.includes(index) || 
      matchedPairIds.includes(cards[index].pairId) ||
      flippedIndices.length === 2
    ) return;

    const newFlipped = [...flippedIndices, index];
    setGameState(prev => ({ ...prev, flippedIndices: newFlipped }));

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      setGameState(prev => ({ ...prev, moves: prev.moves + 1 }));

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setTimeout(() => {
          setGameState(prev => {
            const newMatched = [...prev.matchedPairIds, firstCard.pairId];
            const isWon = newMatched.length === cards.length / 2;
            
            // Scoring based on difficulty and streak
            const difficultyMultiplier = prev.difficulty === 'Easy' ? 1 : prev.difficulty === 'Medium' ? 1.5 : 2;
            const streakMultiplier = 1 + (prev.streak * 0.25);
            const matchPoints = Math.floor(100 * difficultyMultiplier * streakMultiplier);

            return {
              ...prev,
              matchedPairIds: newMatched,
              flippedIndices: [],
              score: prev.score + matchPoints,
              streak: prev.streak + 1,
              isWon,
              showExplanation: firstCard
            };
          });
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setGameState(prev => {
            const penalty = prev.difficulty === 'Easy' ? 10 : prev.difficulty === 'Medium' ? 20 : 40;
            return { 
              ...prev, 
              flippedIndices: [],
              score: Math.max(0, prev.score - penalty),
              streak: 0
            };
          });
        }, 1200);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/50 p-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-500">
              <Microscope size={24} />
            </div>
            <div>
              <h1 className="font-serif text-xl italic tracking-tight text-white">MicroPath Memory</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/60">Pathology & Microbiology Lab</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden text-right md:block">
              <span className="block text-[10px] uppercase tracking-widest text-slate-500">Difficulty</span>
              <span className={`text-xs font-bold ${
                gameState.difficulty === 'Easy' ? 'text-emerald-400' : 
                gameState.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {gameState.difficulty}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-slate-500">Score</span>
              <span className="font-mono text-xl font-bold text-emerald-500">
                {gameState.score.toLocaleString()}
              </span>
            </div>
            {gameState.streak > 0 && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={gameState.streak}
                className="text-right"
              >
                <span className="block text-[10px] uppercase tracking-widest text-amber-500">Streak</span>
                <span className="font-mono text-xl font-bold text-amber-500">
                  {gameState.streak}x
                </span>
              </motion.div>
            )}
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-slate-500">Matches</span>
              <span className="font-mono text-xl font-bold text-slate-300">
                {gameState.matchedPairIds.length} / {gameState.cards.length / 2}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowGlossary(true)}
                className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-slate-400 transition-all hover:bg-slate-700 hover:text-white"
                title="Glossary"
              >
                <BookOpen size={18} />
                <span className="hidden text-xs font-bold sm:inline">Glossary</span>
              </button>
              <button 
                onClick={() => setShowInstructions(true)}
                className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-slate-400 transition-all hover:bg-slate-700 hover:text-white"
                title="Instructions"
              >
                <Info size={18} />
                <span className="hidden text-xs font-bold sm:inline">Protocol</span>
              </button>
              <button 
                onClick={() => setIsSelectingDifficulty(true)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600/10 px-3 py-2 text-emerald-400 transition-all hover:bg-emerald-600/20 hover:text-emerald-300"
                title="Change Difficulty"
              >
                <RefreshCw size={18} />
                <span className="hidden text-xs font-bold sm:inline">New Lab</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-6">
        {isSelectingDifficulty ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center py-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md space-y-8 text-center"
            >
              <div>
                <h2 className="text-3xl font-serif italic text-white">Select Lab Difficulty</h2>
                <p className="mt-2 text-slate-400">Choose the complexity of the diagnostic session</p>
              </div>

              <div className="grid gap-4">
                {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => initGame(level)}
                    className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      level === 'Easy' ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10' :
                      level === 'Medium' ? 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10' :
                      'border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-xl font-bold ${
                          level === 'Easy' ? 'text-emerald-400' :
                          level === 'Medium' ? 'text-amber-400' :
                          'text-rose-400'
                        }`}>{level}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">
                          {level === 'Easy' ? '6 pairs • Foundational microbiology. Focuses on basic concepts like vaccination, common skin flora, and simple immune reactions.' :
                           level === 'Medium' ? '10 pairs • Clinical pathology. Introduces diagnostic techniques like ELISA, bacterial toxins, and common autoimmune disorders.' :
                           '15 pairs • Advanced immunology. Challenges you with complex topics like molecular mimicry, chimeric antibodies, and radioimmunoassays.'}
                        </p>
                      </div>
                      <div className={`rounded-full p-2 ${
                        level === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                        level === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>
                        <BrainCircuit size={24} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setShowGlossary(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 py-4 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                >
                  <BookOpen size={20} />
                  <span className="font-bold">Open Diagnostic Glossary</span>
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            {/* Game Grid */}
            <div className={`grid gap-3 ${
              gameState.difficulty === 'Easy' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' :
              gameState.difficulty === 'Medium' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' :
              'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
            }`}>
              {gameState.cards.map((card, index) => (
                <Card 
                  key={card.id}
                  card={card}
                  isFlipped={gameState.flippedIndices.includes(index)}
                  isMatched={gameState.matchedPairIds.includes(card.pairId)}
                  canFlip={gameState.flippedIndices.length < 2}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </div>
          </>
        )}

        {/* Win State */}
        <AnimatePresence>
          {gameState.isWon && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 flex flex-col items-center rounded-3xl border border-emerald-500/20 bg-emerald-950/10 p-12 text-center backdrop-blur-md"
            >
              <div className="mb-4 rounded-full bg-emerald-500 p-4 text-black shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <Trophy size={48} />
              </div>
              <h2 className="mb-2 text-4xl font-serif italic text-white">Master Pathologist</h2>
              <p className="mb-8 max-w-md text-slate-400">
                You've successfully identified all microbial concepts and their characteristics. Your diagnostic skills are exceptional.
              </p>
              <button 
                onClick={() => setIsSelectingDifficulty(true)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white transition-all hover:bg-emerald-500 active:scale-95"
              >
                <RefreshCw size={18} />
                Start New Lab Session
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <footer className="mt-16 border-t border-white/5 py-8 text-center">
          <div className="flex justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <Stethoscope size={14} />
              <span className="text-xs">Clinical Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Dna size={14} />
              <span className="text-xs">Genetic Basis</span>
            </div>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-slate-600">
            &copy; 2026 MicroPath Educational Labs
          </p>
        </footer>
      </main>

      {/* Instructions Modal */}
      <AnimatePresence>
        {showInstructions && (
          <InstructionsModal onClose={() => setShowInstructions(false)} />
        )}
        {showGlossary && (
          <GlossaryModal onClose={() => setShowGlossary(false)} />
        )}
      </AnimatePresence>

      {/* Explanation Modal */}
      <AnimatePresence>
        {gameState.showExplanation && (
          <ExplanationModal 
            card={gameState.showExplanation} 
            onClose={() => setGameState(prev => ({ ...prev, showExplanation: null }))} 
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
