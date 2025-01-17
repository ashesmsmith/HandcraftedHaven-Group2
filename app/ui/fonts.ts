import { Cormorant, Montserrat } from 'next/font/google';

export const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '700'], // Adjust weights as needed
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Adjust weights as needed
  display: 'swap',
});
