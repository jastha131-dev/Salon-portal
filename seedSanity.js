// Seed script for Sanity Studio
// Usage: node seedSanity.js


import { createClient } from 'next-sanity';


import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('Sanity ENV:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
});

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {

  // Categories
  const categories = [
    { _type: 'category', name: 'Hair', description: 'Hair styling and treatments.' },
    { _type: 'category', name: 'Nails', description: 'Manicure and pedicure services.' },
    { _type: 'category', name: 'Spa', description: 'Relaxing spa treatments.' },
  ];

  // Services (no image)
  const services = [
    {
      _type: 'service',
      name: 'Luxury Haircut',
      price: 80,
      duration: '60 min',
    },
    {
      _type: 'service',
      name: 'Classic Manicure',
      price: 40,
      duration: '45 min',
    },
  ];

  // Team Members (no image)
  const teamMembers = [
    {
      _type: 'teamMember',
      name: 'Sophia Lee',
      role: 'Senior Stylist',
    },
    {
      _type: 'teamMember',
      name: 'James Smith',
      role: 'Nail Technician',
    },
  ];

  // Gallery Images (image left empty for manual upload)
  const galleryImages = [
    {
      _type: 'galleryImage',
      caption: 'Our beautiful, modern salon.'
    },
    {
      _type: 'galleryImage',
      caption: 'Enjoy a peaceful spa experience.'
    },
  ];

  // Reviews
  const reviews = [
    {
      _type: 'review',
      name: 'Emily R.',
      rating: 5,
      comment: 'Absolutely loved my haircut! The staff is amazing.'
    },
    {
      _type: 'review',
      name: 'Michael T.',
      rating: 4,
      comment: 'Great manicure and friendly service.'
    },
  ];

  // Insert documents
  for (const doc of [...categories, ...services, ...teamMembers, ...galleryImages, ...reviews]) {
    try {
      await client.create(doc);
      console.log(`Created: ${doc._type} - ${doc.title || doc.name}`);
    } catch (e) {
      console.error(`Error creating ${doc._type}:`, e.message);
    }
  }
}

seed();
