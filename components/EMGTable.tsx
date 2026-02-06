'use client';

import { EMGReading, EMGStudy, createEmptyReading, generateWordTable, generateHTMLTable } from '@/lib/emg';
import { INS_OPTIONS, PWAVE_OPTIONS, FIB_OPTIONS, FASC_OPTIONS, OTHER_OPTIONS, EFF_OPTIONS, RECRT_OPTIONS, AMP_OPTIONS, DUR_OPTIONS, POLY_OPTIONS } from '@/lib/emg';
import { saveStudy } from '@/lib/storage';
import { useState, useCallback } from 'react';

interface EMGTableProps {
  muscles: string[];
  onComplete: () => void;
}

export default function EMGTable({ muscles, onComplete }: EMGTableProps) {
  const [readings, setReadings] = useState<EMGReading[]>(
    muscles.map(createEmptyReading)
  );
  const [patientName, setPatientName] = useState('');
  const [studyDate, setStudyDate] = useState(new Date().toISOString().split('T')[0]);
  const [conclusion, setConclusion] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateReading = useCallback((index: number, field: keyof EMGReading, value: string) => {
    setReadings(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleSave = useCallback(() => {
    const study: EMGStudy = {
      id: `emg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      patientName: patientName || undefined,
      studyDate: studyDate || undefined,
      muscles: readings,
      conclusion: conclusion || undefined
    };
    
    saveStudy(study);
    setShowPreview(true);
  }, [readings, patientName, studyDate, conclusion]);

  const copyToClipboard = async () => {
    const study: EMGStudy = {
      id: `emg-${Date.now()}`,
      timestamp: Date.now(),
      patientName: patientName || undefined,
      studyDate: studyDate || undefined,
      muscles: readings,
      conclusion: conclusion || undefined
    };
    
    const text = generateWordTable(study);
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyHTML = async () => {
    const study: EMGStudy = {
      id: `emg-${Date.now()}`,
      timestamp: Date.now(),
      patientName: patientName || undefined,
      studyDate: studyDate || undefined,
      muscles: readings,
      conclusion: conclusion || undefined
    };
    
    const html = generateHTMLTable(study);
    
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (showPreview) {
    const study: EMGStudy = {
      id: `emg-${Date.now()}`,
      timestamp: Date.now(),
      patientName: patientName || undefined,
      studyDate: studyDate || undefined,
      muscles: readings,
      conclusion: conclusion || undefined
    };
    
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-semibold text-green-900 mb-2">Study Saved!</h3>
          <p className="text-green-700 text-sm">Copy the table below and paste into Microsoft Word</p>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">MUSCLE</th>
                <th colSpan={5} className="border p-2 text-center">INSERTIONAL/SPONTANEOUS</th>
                <th colSpan={5} className="border p-2 text-center">VOLUNTARY MOTOR UNIT POTENTIAL</th>
              </tr>
              <tr className="bg-gray-50 text-xs">
                <th className="border p-2"></th>
                <th className="border p-2">ins</th>
                <th className="border p-2">p wave</th>
                <th className="border p-2">fib</th>
                <th className="border p-2">fasc</th>
                <th className="border p-2">other</th>
                <th className="border p-2">eff</th>
                <th className="border p-2">recrt</th>
                <th className="border p-2">amp</th>
                <th className="border p-2">dur</th>
                <th className="border p-2">poly</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((reading, i) => (
                <tr key={i}>
                  <td className="border p-2 font-medium">{reading.muscle}</td>
                  <td className="border p-2 text-center">{reading.ins || '-'}</td>
                  <td className="border p-2 text-center">{reading.pWave || '-'}</td>
                  <td className="border p-2 text-center">{reading.fib || '-'}</td>
                  <td className="border p-2 text-center">{reading.fasc || '-'}</td>
                  <td className="border p-2 text-center">{reading.other || '-'}</td>
                  <td className="border p-2 text-center">{reading.eff || '-'}</td>
                  <td className="border p-2 text-center">{reading.recrt || '-'}</td>
                  <td className="border p-2 text-center">{reading.amp || '-'}</td>
                  <td className="border p-2 text-center">{reading.dur || '-'}</td>
                  <td className="border p-2 text-center">{reading.poly || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyToClipboard}
            className={`flex-1 min-w-[150px] py-3 px-6 rounded-xl font-semibold shadow-lg transition-all ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy for Word'}
          </button>
          <button
            onClick={copyHTML}
            className="flex-1 min-w-[150px] bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all"
          >
            Copy HTML
          </button>
          <button
            onClick={() => setShowPreview(false)}
            className="flex-1 min-w-[150px] border-2 border-gray-200 text-gray-600 py-3 px-6 rounded-xl font-semibold hover:border-gray-300 transition-all"
          >
            Back to Edit
          </button>
          <button
            onClick={onComplete}
            className="flex-1 min-w-[150px] bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-all"
          >
            New Study
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Patient Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Study Date</label>
            <input
              type="date"
              value={studyDate}
              onChange={(e) => setStudyDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* EMG Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th rowSpan={2} className="border p-2 text-left font-semibold sticky left-0 bg-gray-100">MUSCLE</th>
                <th colSpan={5} className="border p-2 text-center font-semibold">INSERTIONAL / SPONTANEOUS</th>
                <th colSpan={5} className="border p-2 text-center font-semibold">VOLUNTARY MOTOR UNIT POTENTIAL</th>
              </tr>
              <tr className="bg-gray-50 text-xs">
                <th className="border p-1">ins</th>
                <th className="border p-1">p wave</th>
                <th className="border p-1">fib</th>
                <th className="border p-1">fasc</th>
                <th className="border p-1">other</th>
                <th className="border p-1">eff</th>
                <th className="border p-1">recrt</th>
                <th className="border p-1">amp</th>
                <th className="border p-1">dur</th>
                <th className="border p-1">poly</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((reading, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2 font-medium sticky left-0 bg-white">{reading.muscle}</td>
                  <td className="border p-1">
                    <Select value={reading.ins} onChange={(v) => updateReading(index, 'ins', v)} options={INS_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.pWave} onChange={(v) => updateReading(index, 'pWave', v)} options={PWAVE_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.fib} onChange={(v) => updateReading(index, 'fib', v)} options={FIB_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.fasc} onChange={(v) => updateReading(index, 'fasc', v)} options={FASC_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.other} onChange={(v) => updateReading(index, 'other', v)} options={OTHER_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.eff} onChange={(v) => updateReading(index, 'eff', v)} options={EFF_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.recrt} onChange={(v) => updateReading(index, 'recrt', v)} options={RECRT_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.amp} onChange={(v) => updateReading(index, 'amp', v)} options={AMP_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.dur} onChange={(v) => updateReading(index, 'dur', v)} options={DUR_OPTIONS} />
                  </td>
                  <td className="border p-1">
                    <Select value={reading.poly} onChange={(v) => updateReading(index, 'poly', v)} options={POLY_OPTIONS} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Conclusion / Impression</label>
        <textarea
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          placeholder="Enter study conclusion..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
        >
          Save & Generate Table
        </button>
        <button
          onClick={onComplete}
          className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-gray-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// Helper Select component
function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-w-[60px] px-1 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
    >
      <option value=""></option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}