declare global {
    class OncoTracker {
      init(config: {
        siteId: string;
      }): void;
      capture(eventName: string, data: any): void;
      setPhoneNumber(phone: string): void;
      toggleDebugMode(): boolean;
      debug(): any;
    }
  
    class RallybaseTracker extends OncoTracker {}
  }