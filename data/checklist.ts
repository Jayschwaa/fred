import { ChecklistItem } from '@/types';

export const checklistTemplate: ChecklistItem[] = [
  // Thermostat
  {
    id: 'check_001',
    category: 'Thermostat',
    label: 'Thermostat display and operation',
    required: true,
  },
  {
    id: 'check_002',
    category: 'Thermostat',
    label: 'Thermostat calibration',
    required: false,
  },
  {
    id: 'check_003',
    category: 'Thermostat',
    label: 'Thermostat batteries (if applicable)',
    required: false,
  },
  // Air Filter
  {
    id: 'check_004',
    category: 'Air Filter',
    label: 'Air filter condition',
    required: true,
  },
  {
    id: 'check_005',
    category: 'Air Filter',
    label: 'Filter size and type verification',
    required: true,
  },
  {
    id: 'check_006',
    category: 'Air Filter',
    label: 'Return duct cleanliness',
    required: false,
  },
  // Electrical
  {
    id: 'check_007',
    category: 'Electrical',
    label: 'Electrical connections secure',
    required: true,
  },
  {
    id: 'check_008',
    category: 'Electrical',
    label: 'Capacitor condition',
    required: true,
  },
  {
    id: 'check_009',
    category: 'Electrical',
    label: 'Circuit breaker operation',
    required: true,
  },
  {
    id: 'check_010',
    category: 'Electrical',
    label: 'Voltage readings',
    required: false,
  },
  // Condensate
  {
    id: 'check_011',
    category: 'Condensate',
    label: 'Condensate pan condition',
    required: true,
  },
  {
    id: 'check_012',
    category: 'Condensate',
    label: 'Condensate drain line clear',
    required: true,
  },
  {
    id: 'check_013',
    category: 'Condensate',
    label: 'Drain trap filled with water',
    required: false,
  },
  // Blower
  {
    id: 'check_014',
    category: 'Blower',
    label: 'Blower motor operation',
    required: true,
  },
  {
    id: 'check_015',
    category: 'Blower',
    label: 'Blower wheel cleanliness',
    required: true,
  },
  {
    id: 'check_016',
    category: 'Blower',
    label: 'Blower bearings smooth',
    required: false,
  },
  {
    id: 'check_017',
    category: 'Blower',
    label: 'Air velocity at registers',
    required: false,
  },
  // Evaporator Coil
  {
    id: 'check_018',
    category: 'Evaporator Coil',
    label: 'Evaporator coil cleanliness',
    required: true,
  },
  {
    id: 'check_019',
    category: 'Evaporator Coil',
    label: 'Coil fins condition',
    required: true,
  },
  {
    id: 'check_020',
    category: 'Evaporator Coil',
    label: 'Air bypass (return air temperature)',
    required: false,
  },
  // Condenser
  {
    id: 'check_021',
    category: 'Condenser',
    label: 'Condenser coil cleanliness',
    required: true,
  },
  {
    id: 'check_022',
    category: 'Condenser',
    label: 'Condenser fan operation',
    required: true,
  },
  {
    id: 'check_023',
    category: 'Condenser',
    label: 'Condenser pad condition',
    required: false,
  },
  {
    id: 'check_024',
    category: 'Condenser',
    label: 'Outdoor unit clearance',
    required: true,
  },
  // Refrigerant
  {
    id: 'check_025',
    category: 'Refrigerant',
    label: 'Refrigerant charge check',
    required: true,
  },
  {
    id: 'check_026',
    category: 'Refrigerant',
    label: 'Suction line temperature',
    required: false,
  },
  {
    id: 'check_027',
    category: 'Refrigerant',
    label: 'Discharge line temperature',
    required: false,
  },
  {
    id: 'check_028',
    category: 'Refrigerant',
    label: 'Refrigerant line insulation',
    required: true,
  },
  // Ductwork
  {
    id: 'check_029',
    category: 'Ductwork',
    label: 'Ductwork sealed and insulated',
    required: true,
  },
  {
    id: 'check_030',
    category: 'Ductwork',
    label: 'Supply and return air balance',
    required: false,
  },
  // Safety
  {
    id: 'check_031',
    category: 'Safety',
    label: 'High limit switch operation',
    required: true,
  },
  {
    id: 'check_032',
    category: 'Safety',
    label: 'Safety shutoff systems functional',
    required: true,
  },
];
