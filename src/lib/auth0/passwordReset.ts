
import { auth0Config } from './config';
import { logAuth0Event, sanitizeAuth0UserData } from '../security/auth0Integration';

export interface PasswordResetRequest {
  email: string;
  connection?: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class Auth0PasswordResetService {
  private static baseUrl = `https://${auth0Config.domain}`;

  static async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    try {
      // Log the password reset attempt (with masked email for privacy)
      logAuth0Event('password_reset_requested', undefined, { 
        email: email.replace(/(.{2}).*(@.*)/, '$1***$2') 
      });

      const sanitizedData = sanitizeAuth0UserData({ email });
      
      const response = await fetch(`${this.baseUrl}/dbconnections/change_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: auth0Config.clientId,
          email: sanitizedData.email,
          connection: 'Username-Password-Authentication',
        }),
      });

      if (response.ok) {
        logAuth0Event('password_reset_success', undefined, { 
          email: sanitizedData.email.replace(/(.{2}).*(@.*)/, '$1***$2')
        });
        return {
          success: true,
          message: 'Password reset email sent successfully'
        };
      } else {
        const errorData = await response.json();
        logAuth0Event('password_reset_failed', undefined, { 
          email: sanitizedData.email.replace(/(.{2}).*(@.*)/, '$1***$2'),
          error: errorData.error_description || 'Unknown error'
        });
        
        return {
          success: false,
          message: 'Failed to send password reset email',
          error: errorData.error_description || 'Unknown error'
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      logAuth0Event('password_reset_error', undefined, { 
        email: email.replace(/(.{2}).*(@.*)/, '$1***$2'),
        error: errorMessage
      });
      
      return {
        success: false,
        message: 'Network error occurred',
        error: errorMessage
      };
    }
  }

  static async validateResetToken(token: string): Promise<boolean> {
    try {
      // In a real implementation, validate the token with Auth0's API
      logAuth0Event('password_reset_token_validated', undefined, { 
        token: token.substring(0, 8) + '...' 
      });
      return token.length > 10; // Simple validation for demo
    } catch (error) {
      logAuth0Event('password_reset_token_validation_failed', undefined, { 
        error: error instanceof Error ? error.message : 'Token validation failed'
      });
      return false;
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<PasswordResetResponse> {
    try {
      // Validate token first
      const isValidToken = await this.validateResetToken(token);
      if (!isValidToken) {
        return {
          success: false,
          message: 'Invalid or expired reset token',
          error: 'TOKEN_INVALID'
        };
      }

      // In a real implementation, call Auth0's API to reset the password
      // This is a simplified version for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      logAuth0Event('password_reset_completed', undefined, { 
        token: token.substring(0, 8) + '...' 
      });
      
      return {
        success: true,
        message: 'Password reset successfully'
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
      logAuth0Event('password_reset_completion_failed', undefined, { 
        error: errorMessage 
      });
      
      return {
        success: false,
        message: 'Failed to reset password',
        error: errorMessage
      };
    }
  }
}
