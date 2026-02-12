import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (generated from your schema)
export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      drivers: {
        Row: {
          id: string
          employee_id: string
          first_name: string
          last_name: string
          license_number: string
          phone_number: string
          email: string | null
          password_hash: string
          address: string
          date_of_birth: string
          hire_date: string
          status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_LEAVE'
          experience: number
          rating: number
          total_trips: number
          emergency_name: string
          emergency_phone: string
          emergency_relation: string
          photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          first_name: string
          last_name: string
          license_number: string
          phone_number: string
          email?: string | null
          password_hash: string
          address: string
          date_of_birth: string
          hire_date: string
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_LEAVE'
          experience?: number
          rating?: number
          total_trips?: number
          emergency_name: string
          emergency_phone: string
          emergency_relation: string
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          first_name?: string
          last_name?: string
          license_number?: string
          phone_number?: string
          email?: string | null
          password_hash?: string
          address?: string
          date_of_birth?: string
          hire_date?: string
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_LEAVE'
          experience?: number
          rating?: number
          total_trips?: number
          emergency_name?: string
          emergency_phone?: string
          emergency_relation?: string
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      routes: {
        Row: {
          id: string
          static_id: string
          route_number: string
          name: string
          start_location: string
          end_location: string
          distance: number
          estimated_duration: number
          fare_price: number
          is_active: boolean
          agency_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          static_id: string
          route_number: string
          name: string
          start_location: string
          end_location: string
          distance: number
          estimated_duration: number
          fare_price: number
          is_active?: boolean
          agency_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          static_id?: string
          route_number?: string
          name?: string
          start_location?: string
          end_location?: string
          distance?: number
          estimated_duration?: number
          fare_price?: number
          is_active?: boolean
          agency_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      buses: {
        Row: {
          id: string
          plate_number: string
          bus_number: string
          fleet_number: string | null
          bus_type: 'ANBESSA' | 'SHEGER' | 'VELOCITY'
          status: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE' | 'OUT_OF_SERVICE'
          capacity: number
          standing_capacity: number | null
          current_passengers: number
          route_id: string | null
          driver_id: string | null
          last_maintenance: string | null
          next_maintenance: string | null
          mileage: number | null
          fuel_level: number | null
          gps_enabled: boolean
          manufacturer: string | null
          model_year: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plate_number: string
          bus_number: string
          fleet_number?: string | null
          bus_type: 'ANBESSA' | 'SHEGER' | 'VELOCITY'
          status?: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE' | 'OUT_OF_SERVICE'
          capacity: number
          standing_capacity?: number | null
          current_passengers?: number
          route_id?: string | null
          driver_id?: string | null
          last_maintenance?: string | null
          next_maintenance?: string | null
          mileage?: number | null
          fuel_level?: number | null
          gps_enabled?: boolean
          manufacturer?: string | null
          model_year?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plate_number?: string
          bus_number?: string
          fleet_number?: string | null
          bus_type?: 'ANBESSA' | 'SHEGER' | 'VELOCITY'
          status?: 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE' | 'OUT_OF_SERVICE'
          capacity?: number
          standing_capacity?: number | null
          current_passengers?: number
          route_id?: string | null
          driver_id?: string | null
          last_maintenance?: string | null
          next_maintenance?: string | null
          mileage?: number | null
          fuel_level?: number | null
          gps_enabled?: boolean
          manufacturer?: string | null
          model_year?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}