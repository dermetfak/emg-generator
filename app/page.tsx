'use client';

import { useState } from 'react';
import MuscleSelector from '@/components/MuscleSelector';
import EMGTable from '@/components/EMGTable';

export default function Home() {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);

  const handleStartStudy = () => {
    if (selectedMuscles.length === 0) {
      alert('Please select at least one muscle');
      return;
    }
    setShowTable(true);
  };

  const handleComplete = () => {
    setShowTable(false);
    setSelectedMuscles([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EMG Report Generator</h1>
              <p className="text-xs text-gray-500">Electromyography table generator for clinical reports</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {!showTable ? (
          <div className="max-w-2xl mx-auto space-y-4">
            <MuscleSelector
              selectedMuscles={selectedMuscles}
              onChange={setSelectedMuscles}
            />
            
            <button
              onClick={handleStartStudy}
              disabled={selectedMuscles.length === 0}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:bg-gray-300 disabled:shadow-none transition-all"
            >
              Start EMG Study ({selectedMuscles.length} muscles)
            </button>
          </div>
        ) : (
          <EMGTable
            muscles={selectedMuscles}
            onComplete={handleComplete}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-gray-500">
            EMG Report Generator • Built with Next.js • Copy tables directly to Microsoft Word
          </p>
        </div>
      </footer>
    </div>
  );
}