import Round from "./round.interface";

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            workouts: {
                Row: {
                    id: number;
                    inserted_at: string;
                    updated_at: string;
                    name: string;
                    data: {
                        rounds: Round[];
                    };
                };
                Insert: {
                    id?: number;
                    inserted_at?: string;
                    updated_at?: string;
                    name?: string;
                    data?: {
                        rounds: Round[];
                    };
                };
                Update: {
                    id?: number;
                    inserted_at?: string;
                    updated_at?: string;
                    name?: string;
                    data?: {
                        rounds: Round[];
                    };
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            install_available_extensions_and_test: {
                Args: Record<PropertyKey, never>;
                Returns: boolean;
            };
        };
        Enums: {
            [_ in never]: never;
        };
    };
}
