// Audit Logging
export interface AuditEvent {
  action: string;
  userId?: string;
  timestamp: number;
  ip?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

export class AuditLogger {
  static log(event: Omit<AuditEvent, 'timestamp'>): void {
    const auditEvent: AuditEvent = {
      ...event,
      timestamp: Date.now()
    };
    
    // In production, send to secure logging service
    console.log('AUDIT:', auditEvent);
    
    // Store locally for offline capability
    try {
      const logs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
      logs.push(auditEvent);
      
      // Keep only last 1000 entries to prevent storage overflow
      if (logs.length > 1000) {
        logs.splice(0, logs.length - 1000);
      }
      
      localStorage.setItem('audit_logs', JSON.stringify(logs));
    } catch (error) {
      console.error('Audit logging error:', error);
    }
  }
}
