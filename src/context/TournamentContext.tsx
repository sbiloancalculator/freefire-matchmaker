
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TournamentContextType, Tournament, TournamentStatus, PaymentStatus } from '@/lib/types';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

// Mock tournament data
const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    name: 'Solo Showdown',
    description: 'Battle against the best solo players in this intense Free Fire showdown. Every kill counts!',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    time: '8:00 PM',
    entryFee: 30,
    prizePool: 500,
    participants: 45,
    maxParticipants: 50,
    status: TournamentStatus.UPCOMING,
    image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Squad Royale',
    description: 'Team up with your friends and dominate the battlefield in this squad competition!',
    date: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes from now
    time: '6:30 PM',
    entryFee: 50,
    prizePool: 1000,
    participants: 20,
    maxParticipants: 20,
    status: TournamentStatus.ACTIVE,
    roomId: '123456',
    password: 'freefire123',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Duo Challenge',
    description: 'Find a partner and test your synergy in this competitive duo tournament!',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    time: '9:00 PM',
    entryFee: 40,
    prizePool: 800,
    participants: 30,
    maxParticipants: 30,
    status: TournamentStatus.COMPLETED,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop'
  }
];

// Mock payments data
const MOCK_PAYMENTS: { [key: string]: PaymentStatus } = {};

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch tournaments on mount
  useEffect(() => {
    refreshTournaments();
  }, []);

  // Refresh tournaments function
  const refreshTournaments = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update tournaments with mock data
      setTournaments(MOCK_TOURNAMENTS);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to fetch tournaments'));
      toast.error('Failed to load tournaments');
    } finally {
      setIsLoading(false);
    }
  };

  // Get tournament by ID
  const getTournamentById = (id: string): Tournament | undefined => {
    return tournaments.find(tournament => tournament.id === id);
  };

  // Join tournament function
  const joinTournament = async (tournamentId: string): Promise<{ qrCode: string }> => {
    if (!user) {
      throw new Error('You must be logged in to join a tournament');
    }

    // Find tournament
    const tournament = getTournamentById(tournamentId);
    
    if (!tournament) {
      throw new Error('Tournament not found');
    }

    if (tournament.status !== TournamentStatus.UPCOMING && tournament.status !== TournamentStatus.ACTIVE) {
      throw new Error('This tournament is no longer accepting entries');
    }

    if (tournament.participants >= tournament.maxParticipants) {
      throw new Error('Tournament is full');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate payment key for this user and tournament
    const paymentKey = `${user.id}_${tournamentId}`;
    
    // If already paid, return existing status
    if (MOCK_PAYMENTS[paymentKey] === PaymentStatus.VERIFIED) {
      throw new Error('You have already joined this tournament');
    }

    // Set initial payment status
    if (!MOCK_PAYMENTS[paymentKey]) {
      MOCK_PAYMENTS[paymentKey] = PaymentStatus.PENDING;
    }

    // Return QR code data (in a real app, this would be dynamically generated)
    return {
      qrCode: "data:image/png;base64,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"
    };
  };

  // Verify payment function
  const verifyPayment = async (tournamentId: string, utrNumber: string): Promise<PaymentStatus> => {
    if (!user) {
      throw new Error('You must be logged in to verify a payment');
    }

    // Find tournament
    const tournament = getTournamentById(tournamentId);
    
    if (!tournament) {
      throw new Error('Tournament not found');
    }

    // Generate payment key
    const paymentKey = `${user.id}_${tournamentId}`;
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check UTR number (in a real app, this would verify against actual payment data)
    // For demo purposes, we'll validate simple patterns
    
    // Valid UTR starts with tournament ID and has 10 digits
    const validUTR = new RegExp(`^${tournamentId}\\d{9}$`);
    
    // If already verified, return that status
    if (MOCK_PAYMENTS[paymentKey] === PaymentStatus.VERIFIED) {
      return PaymentStatus.VERIFIED;
    }
    
    // Set payment status based on UTR pattern
    if (validUTR.test(utrNumber)) {
      MOCK_PAYMENTS[paymentKey] = PaymentStatus.VERIFIED;
      
      // Increase participant count for tournament
      const updatedTournaments = tournaments.map(t => {
        if (t.id === tournamentId) {
          return {
            ...t,
            participants: t.participants + 1
          };
        }
        return t;
      });
      
      setTournaments(updatedTournaments);
      
      return PaymentStatus.VERIFIED;
    } else if (utrNumber.length === 10) {
      // UTR is right length but doesn't match pattern
      MOCK_PAYMENTS[paymentKey] = PaymentStatus.UNDER_REVIEW;
      return PaymentStatus.UNDER_REVIEW;
    } else {
      // Invalid UTR number format
      MOCK_PAYMENTS[paymentKey] = PaymentStatus.REJECTED;
      return PaymentStatus.REJECTED;
    }
  };

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        isLoading,
        error,
        refreshTournaments,
        getTournamentById,
        joinTournament,
        verifyPayment
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournaments() {
  const context = useContext(TournamentContext);
  
  if (context === undefined) {
    throw new Error('useTournaments must be used within a TournamentProvider');
  }
  
  return context;
}
