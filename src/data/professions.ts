import { Profession } from '@/types';

export const PROFESSIONS: Profession[] = [
  {
    code: 'roofing',
    label: 'Roofing Contractors',
    synonyms: ['roofer', 'roof repair', 'roof installation', 'roofing company'],
    category: 'Home Services',
  },
  {
    code: 'hvac',
    label: 'HVAC Services',
    synonyms: ['heating', 'cooling', 'air conditioning', 'furnace repair', 'hvac contractor'],
    category: 'Home Services',
  },
  {
    code: 'plumbing',
    label: 'Plumbing Services',
    synonyms: ['plumber', 'pipe repair', 'drain cleaning', 'plumbing contractor'],
    category: 'Home Services',
  },
  {
    code: 'electrician',
    label: 'Electricians',
    synonyms: ['electrical contractor', 'wiring', 'electrical repair'],
    category: 'Home Services',
  },
  {
    code: 'landscaping',
    label: 'Landscaping Services',
    synonyms: ['landscaper', 'lawn care', 'garden maintenance', 'yard work'],
    category: 'Home Services',
  },
  {
    code: 'dentist',
    label: 'Dentists',
    synonyms: ['dental clinic', 'orthodontist', 'dental care'],
    category: 'Healthcare',
  },
  {
    code: 'chiropractor',
    label: 'Chiropractors',
    synonyms: ['chiropractic care', 'spine adjustment'],
    category: 'Healthcare',
  },
  {
    code: 'restaurant',
    label: 'Restaurants',
    synonyms: ['dining', 'eatery', 'food service', 'cafe'],
    category: 'Food & Beverage',
  },
  {
    code: 'real_estate',
    label: 'Real Estate Agents',
    synonyms: ['realtor', 'property agent', 'real estate broker'],
    category: 'Professional Services',
  },
  {
    code: 'lawyer',
    label: 'Lawyers',
    synonyms: ['attorney', 'legal services', 'law firm'],
    category: 'Professional Services',
  },
  {
    code: 'accountant',
    label: 'Accountants',
    synonyms: ['cpa', 'bookkeeping', 'tax services', 'accounting firm'],
    category: 'Professional Services',
  },
  {
    code: 'insurance',
    label: 'Insurance Agents',
    synonyms: ['insurance broker', 'insurance agency'],
    category: 'Professional Services',
  },
];

export function searchProfessions(query: string): Profession[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return PROFESSIONS;
  
  return PROFESSIONS.filter(
    (prof) =>
      prof.label.toLowerCase().includes(lowerQuery) ||
      prof.code.toLowerCase().includes(lowerQuery) ||
      prof.category.toLowerCase().includes(lowerQuery) ||
      prof.synonyms.some((syn) => syn.toLowerCase().includes(lowerQuery))
  );
}
