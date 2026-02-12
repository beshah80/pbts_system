// GPS Tracker for Driver App - Sends real location data to backend

export interface GPSPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  heading: number;
  timestamp: number;
}

class GPSTracker {
  private watchId: number | null = null;
  private isTracking = false;
  private busId: string | null = null;
  private routeId: string | null = null;
  private driverId: string | null = null;
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.checkGeolocationSupport();
  }

  private checkGeolocationSupport(): boolean {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return false;
    }
    return true;
  }

  // Start GPS tracking
  startTracking(busId: string, routeId: string, driverId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.checkGeolocationSupport()) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      this.busId = busId;
      this.routeId = routeId;
      this.driverId = driverId;

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
      };

      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.handlePositionUpdate(position);
          if (!this.isTracking) {
            this.isTracking = true;
            resolve();
          }
        },
        (error) => {
          console.error('GPS Error:', error);
          if (!this.isTracking) {
            reject(error);
          }
        },
        options
      );

      // Send updates every 10 seconds
      this.updateInterval = setInterval(() => {
        if (this.isTracking) {
          navigator.geolocation.getCurrentPosition(
            (position) => this.handlePositionUpdate(position),
            (error) => console.error('GPS Update Error:', error),
            options
          );
        }
      }, 10000);
    });
  }

  // Stop GPS tracking
  stopTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }

    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    this.isTracking = false;
    this.busId = null;
    this.routeId = null;
    this.driverId = null;
  }

  // Handle position updates
  private async handlePositionUpdate(position: GeolocationPosition): Promise<void> {
    if (!this.busId || !this.routeId || !this.driverId) return;

    const gpsData: GPSPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      speed: position.coords.speed || 0,
      heading: position.coords.heading || 0,
      timestamp: position.timestamp
    };

    try {
      await this.sendLocationUpdate(gpsData);
    } catch (error) {
      console.error('Failed to send location update:', error);
    }
  }

  // Send location to backend
  private async sendLocationUpdate(gpsData: GPSPosition): Promise<void> {
    const payload = {
      busId: this.busId,
      latitude: gpsData.latitude,
      longitude: gpsData.longitude,
      speed: gpsData.speed,
      heading: gpsData.heading,
      accuracy: gpsData.accuracy,
      routeId: this.routeId,
      driverId: this.driverId,
      status: this.determineStatus(gpsData.speed)
    };

    const response = await fetch('http://localhost:3005/api/gps/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  // Determine bus status based on speed
  private determineStatus(speed: number): string {
    if (speed === 0) return 'STOPPED';
    if (speed < 5) return 'BOARDING';
    if (speed > 50) return 'ON_ROUTE';
    return 'ON_ROUTE';
  }

  // Update bus status manually
  async updateBusStatus(status: 'ON_ROUTE' | 'DELAYED' | 'STOPPED' | 'BOARDING'): Promise<void> {
    if (!this.busId) return;

    try {
      const response = await fetch(`http://localhost:3001/api/gps/status/${this.busId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to update bus status:', error);
    }
  }

  // Get current tracking status
  getTrackingStatus(): {
    isTracking: boolean;
    busId: string | null;
    routeId: string | null;
  } {
    return {
      isTracking: this.isTracking,
      busId: this.busId,
      routeId: this.routeId
    };
  }

  // Request location permission
  async requestPermission(): Promise<boolean> {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      
      if (permission.state === 'granted') {
        return true;
      } else if (permission.state === 'prompt') {
        // Try to get position to trigger permission prompt
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => resolve(true),
            () => resolve(false),
            { timeout: 5000 }
          );
        });
      }
      
      return false;
    } catch (error) {
      console.error('Permission check failed:', error);
      return false;
    }
  }
}

export const gpsTracker = new GPSTracker();