export interface EMGReading {
  muscle: string;
  // Insertional/Spontaneous
  ins: 'crd' | 'myt' | '↑' | 'sl ↑' | '↓' | 'sl ↓' | '';
  pWave: 'unsust' | 'sust' | '0' | '';
  fib: '4+' | '3+' | '2+' | '1+' | '0' | '';
  fasc: 'myk' | '4+' | '3+' | '2+' | '1+' | '+-' | '0' | '';
  other: 'crd' | 'myk' | 'myt' | '0' | '';
  // Voluntary motor unit potential
  eff: 'N' | '↓' | '';
  recrt: '↑4+' | '↑3+' | '↑2+' | '↑1+' | 'N' | '↓+-' | '↓1+' | '↓2+' | '↓3+' | '↓4+' | '';
  amp: '↑4+' | '↑3+' | '↑2+' | '↑1+' | 'N' | '↓+-' | '↓1+' | '↓2+' | '↓3+' | '↓4+' | '';
  dur: '↑4+' | '↑3+' | '↑2+' | '↑1+' | 'N' | '↓+-' | '↓1+' | '↓2+' | '↓3+' | '↓4+' | '';
  poly: '↑4+' | '↑3+' | '↑2+' | '↑1+' | 'N' | '↓+-' | '↓1+' | '↓2+' | '↓3+' | '↓4+' | '';
}

export interface EMGStudy {
  id: string;
  timestamp: number;
  patientName?: string;
  studyDate?: string;
  muscles: EMGReading[];
  conclusion?: string;
}

// Column options
export const INS_OPTIONS = ['crd', 'myt', '↑', 'sl ↑', '↓', 'sl ↓'];
export const PWAVE_OPTIONS = ['unsust', 'sust', '0'];
export const FIB_OPTIONS = ['4+', '3+', '2+', '1+', '0'];
export const FASC_OPTIONS = ['myk', '4+', '3+', '2+', '1+', '+-', '0'];
export const OTHER_OPTIONS = ['crd', 'myk', 'myt', '0'];
export const EFF_OPTIONS = ['N', '↓'];
export const RECRT_OPTIONS = ['↑4+', '↑3+', '↑2+', '↑1+', 'N', '↓+-', '↓1+', '↓2+', '↓3+', '↓4+'];
export const AMP_OPTIONS = ['↑4+', '↑3+', '↑2+', '↑1+', 'N', '↓+-', '↓1+', '↓2+', '↓3+', '↓4+'];
export const DUR_OPTIONS = ['↑4+', '↑3+', '↑2+', '↑1+', 'N', '↓+-', '↓1+', '↓2+', '↓3+', '↓4+'];
export const POLY_OPTIONS = ['↑4+', '↑3+', '↑2+', '↑1+', 'N', '↓+-', '↓1+', '↓2+', '↓3+', '↓4+'];

// Default arm muscles
export const DEFAULT_ARM_MUSCLES = [
  'Deltoid',
  'Biceps Brachii',
  'Triceps brachii',
  'Pronator teres',
  'Ext Digitorum Communis',
  'Flexor Carpi Ulnaris',
  'Abd Dig Quinti (Hand)',
  'Abd Pollicis Brevis'
];

// Default leg muscles
export const DEFAULT_LEG_MUSCLES = [
  'Vastus Lateralis',
  'Vastus Medialis',
  'Internal Hamstring',
  'External Hamstring',
  'Anterior Tibialis',
  'Medial Gastrocnemius'
];

// All available muscles
export const ALL_MUSCLES = [
  'Anconeus',
  'Abdominal Oblique',
  'Abd Digitorum (Pedis)',
  'Abd Dig Quinti (Hand)',
  'Abd Digitorum Quinti (Pedis)',
  'Abductor Hallucis',
  'Adductor Longus',
  'Adductor Magnus',
  'Axillary Nerve (Deltoid)',
  'Adductor Pollicis',
  'Abd Pollicis Brevis',
  'Abd Pollicis Longus',
  'Anterior Tibialis',
  'Brachioradialis',
  'Biceps Brachii',
  'Brachialis',
  'Coracobrachialis',
  'Deltoid',
  'Deltoid Anterior',
  'Deltoid Posterior',
  '4th Dorsal Interosseous',
  'Diaphragm',
  'Ext Carpi Radialis',
  'Ext Carp Rad Brev',
  'Ext Carpi Ulnaris',
  'Ext Digitorum Brevis',
  'Ext Digitorum Communis',
  'Ext Digitorum Longus',
  'External Hamstring',
  'Extensor Hallucis Longus',
  'Extensor Indices',
  'External Oblique',
  'Extensor Pollicis Brevis',
  'Extensor Pollicis Longus',
  'Flexor Carpi Radialis',
  'Flexor Carpi Ulnaris',
  'FDI (Hand)',
  'FDI (Pedis)',
  'Flexor Dig Profundus',
  'Flex Dig Superficialis',
  'Flexor Hallucis Brevis',
  'Flexor Hallucis Longus',
  'Flexor Pollicis Brevis',
  'Flexor Pollicis Longus',
  'Frontalis',
  'Gluteus Medius',
  'Gluteus Maximus',
  'Gracilis',
  'Internal Hamstring',
  'Intercostals, High Thoracic',
  'Iliopsoas',
  'Intercostals Low Thoracic',
  'Intercostals, Mid Thoracic',
  'Infraspinatus',
  'Latissimus Dorsi',
  'Lateral Gastrocnemius',
  'Lumbrical #1',
  'Lumbrical #2',
  'Lumbrical #3',
  'Lumbrical #4',
  'Mentalis',
  'Masseter',
  'Medial Gastrocnemius',
  'Nasalis',
  'Orbicularis oculi',
  'Orbicularis oris',
  'Opponens pollicis',
  'Palmaris longus',
  'Peroneus brevis',
  'Peroneus longus',
  'Peroneus tertius',
  'Paraspinal - cervical',
  'Paraspinal - high cervical',
  'Paraspinal - mid cervical',
  'Paraspinal - low cervical',
  'Paraspinal - thoracic',
  'Paraspinal - high thoracic',
  'Paraspinal - mid thoracic',
  'Paraspinal - low thoracic',
  'Paraspinal - lumbar',
  'Paraspinal - high lumbar',
  'Paraspinal - mid lumbar',
  'Paraspinal - low lumbar',
  'Paraspinal - sacral',
  'Paraspinal - high sacral',
  'Paraspinal - mid sacral',
  'Paraspinal - low sacral',
  'Paraspinal - lumbosacral',
  'Palmar interossei (hand)',
  'Pectoralis major',
  'Pectoralis minor',
  'Pronator quadratus',
  'Pronator teres',
  'Posterior tibialis',
  'Quadriceps femoris',
  'Rhomboids',
  'Rectus abdominis',
  'Rectus femoris',
  'External anal sphincter',
  'Serratus anterior',
  'Sartorius',
  'Sternocleidomastoid',
  'Biceps brachii (short head)',
  'Semimembranosus',
  'Soleus',
  'Supraspinatus',
  'Semitendinosus',
  'Supinator',
  'Triceps brachii',
  'Temporalis',
  'Tensor fasciae latae',
  'Teres major',
  'Teres minor',
  'Tongue',
  'Trapezius',
  'Upper trapezius',
  'Middle trapezius',
  'Lower trapezius',
  'Vastus Intermedius',
  'Vastus Lateralis',
  'Vastus Medialis'
];

export function createEmptyReading(muscle: string): EMGReading {
  return {
    muscle,
    ins: '',
    pWave: '',
    fib: '',
    fasc: '',
    other: '',
    eff: '',
    recrt: '',
    amp: '',
    dur: '',
    poly: ''
  };
}

export function generateWordTable(study: EMGStudy): string {
  const lines: string[] = [];
  
  lines.push('ELECTROMYOGRAPHY');
  lines.push('');
  
  if (study.patientName) {
    lines.push(`Patient: ${study.patientName}`);
  }
  if (study.studyDate) {
    lines.push(`Date: ${study.studyDate}`);
  }
  lines.push('');
  
  // Header
  lines.push('MUSCLE\tINSERTIONAL/SPONTANEOUS\t\t\t\t\tVOLUNTARY MOTOR UNIT POTENTIAL');
  lines.push('\tins\tp wave\tfib\tfasc\tother\teff\trecrt\tamp\tdur\tpoly');
  lines.push('');
  
  // Data rows
  study.muscles.forEach(reading => {
    const row = [
      reading.muscle,
      reading.ins || '-',
      reading.pWave || '-',
      reading.fib || '-',
      reading.fasc || '-',
      reading.other || '-',
      reading.eff || '-',
      reading.recrt || '-',
      reading.amp || '-',
      reading.dur || '-',
      reading.poly || '-'
    ].join('\t');
    lines.push(row);
  });
  
  if (study.conclusion) {
    lines.push('');
    lines.push('CONCLUSION:');
    lines.push(study.conclusion);
  }
  
  return lines.join('\n');
}

export function generateHTMLTable(study: EMGStudy): string {
  let html = '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 11px;">';
  
  // Header
  html += '<thead>';
  html += '<tr style="background-color: #f0f0f0;">';
  html += '<th rowspan="2" style="border: 1px solid #000; padding: 5px;">MUSCLE</th>';
  html += '<th colspan="5" style="border: 1px solid #000; padding: 5px;">INSERTIONAL/SPONTANEOUS</th>';
  html += '<th colspan="5" style="border: 1px solid #000; padding: 5px;">VOLUNTARY MOTOR UNIT POTENTIAL</th>';
  html += '</tr>';
  html += '<tr style="background-color: #f0f0f0;">';
  html += '<th style="border: 1px solid #000; padding: 5px;">ins</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">p wave</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">fib</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">fasc</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">other</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">eff</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">recrt</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">amp</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">dur</th>';
  html += '<th style="border: 1px solid #000; padding: 5px;">poly</th>';
  html += '</tr>';
  html += '</thead>';
  
  // Body
  html += '<tbody>';
  study.muscles.forEach(reading => {
    html += '<tr>';
    html += `<td style="border: 1px solid #000; padding: 5px;">${reading.muscle}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.ins || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.pWave || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.fib || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.fasc || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.other || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.eff || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.recrt || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.amp || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.dur || '-'}</td>`;
    html += `<td style="border: 1px solid #000; padding: 5px; text-align: center;">${reading.poly || '-'}</td>`;
    html += '</tr>';
  });
  html += '</tbody>';
  html += '</table>';
  
  return html;
}