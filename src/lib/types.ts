
export enum TournamentStatus {
  UPCOMING = "upcoming",
  ACTIVE = "active",
  COMPLETED = "completed"
}

export enum PaymentStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  UNDER_REVIEW = "under_review",
  REJECTED = "rejected"
}

export interface User {
  id: string;
  name: string;
  email: string;
  freefireId?: string;
  walletBalance: number;
  status: "active" | "banned" | "admin";
  createdAt: Date;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  date: Date;
  time: string;
  entryFee: number;
  prizePool: number;
  participants: number;
  maxParticipants: number;
  minParticipants?: number;
  status: TournamentStatus;
  roomId?: string;
  password?: string;
  image?: string;
  winners?: Winner[];
}

export interface Payment {
  id: string;
  userId: string;
  tournamentId: string;
  amount: number;
  utrNumber?: string;
  status: PaymentStatus;
  createdAt: Date;
}

export interface Winner {
  id: string;
  tournamentId: string;
  userId: string;
  rank: number;
  prizeAmount: number;
  userName?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, freefireId?: string) => Promise<void>;
  logout: () => void;
}

export interface TournamentContextType {
  tournaments: Tournament[];
  isLoading: boolean;
  error: Error | null;
  refreshTournaments: () => Promise<void>;
  getTournamentById: (id: string) => Tournament | undefined;
  joinTournament: (tournamentId: string) => Promise<{ qrCode: string }>;
  verifyPayment: (tournamentId: string, utrNumber: string) => Promise<PaymentStatus>;
}
