/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import FlavorFinder from './components/FlavorFinder';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#4A0E0E]">
      <div className="w-full max-w-4xl space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-block bg-[#711F25] px-6 py-2 rounded-full border-2 border-[#A32A31] shadow-lg">
            <h1 className="text-white font-black italic uppercase tracking-tighter text-2xl">
              Dr Pepper
            </h1>
          </div>
          <p className="text-white/60 font-bold uppercase tracking-[0.2em] text-xs">Flavor Discovery Lab</p>
        </header>

        <main>
          <FlavorFinder />
        </main>

        <footer className="text-center text-white/20 text-[10px] uppercase tracking-widest font-bold">
          © 2026 Dr Pepper Discovery Lab. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
