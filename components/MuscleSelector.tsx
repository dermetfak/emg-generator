'use client';

import { useState } from 'react';
import { ALL_MUSCLES, DEFAULT_ARM_MUSCLES, DEFAULT_LEG_MUSCLES } from '@/lib/emg';

interface MuscleSelectorProps {
  selectedMuscles: string[];
  onChange: (muscles: string[]) => void;
}

export default function MuscleSelector({ selectedMuscles, onChange }: MuscleSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredMuscles = searchTerm
    ? ALL_MUSCLES.filter(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
    : ALL_MUSCLES;

  const displayedMuscles = showAll ? filteredMuscles : filteredMuscles.slice(0, 20);

  const toggleMuscle = (muscle: string) => {
    if (selectedMuscles.includes(muscle)) {
      onChange(selectedMuscles.filter(m => m !== muscle));
    } else {
      onChange([...selectedMuscles, muscle]);
    }
  };

  const loadDefaults = (type: 'arm' | 'leg') => {
    const defaults = type === 'arm' ? DEFAULT_ARM_MUSCLES : DEFAULT_LEG_MUSCLES;
    onChange([...new Set([...selectedMuscles, ...defaults])]);
  };

  const clearAll = () => {
    if (confirm('Clear all selected muscles?')) {
      onChange([]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Select Muscles ({selectedMuscles.length})</h3>
        <div className="flex gap-2">
          <button
            onClick={() => loadDefaults('arm')}
            className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            +Arm
          </button>
          <button
            onClick={() => loadDefaults('leg')}
            className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            +Leg
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search muscles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Selected muscles */}
      {selectedMuscles.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Selected:</p>
          <div className="flex flex-wrap gap-2">
            {selectedMuscles.map(muscle => (
              <span
                key={muscle}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg"
              >
                {muscle}
                <button
                  onClick={() => toggleMuscle(muscle)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Muscle list */}
      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
        {displayedMuscles.map(muscle => (
          <label
            key={muscle}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
          >
            <input
              type="checkbox"
              checked={selectedMuscles.includes(muscle)}
              onChange={() => toggleMuscle(muscle)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{muscle}</span>
          </label>
        ))}
      </div>

      {!showAll && filteredMuscles.length > 20 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800 py-2"
        >
          Show all {filteredMuscles.length} muscles
        </button>
      )}
    </div>
  );
}