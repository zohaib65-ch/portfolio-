import * as crypto from 'crypto';
import { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'admin-portfolio-session';
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// Retrieve configured admin credentials (safe defaults if blank)
export const getAdminCreds = () => {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'adminpass',
  };
};

const getSecret = (): string => {
  const creds = getAdminCreds();
  return crypto
    .createHmac('sha256', creds.password)
    .update(creds.username)
    .digest('hex');
};

export interface SessionPayload {
  username: string;
  expiresAt: number;
}

// Generate secure signature token for admin username
export const createSessionCookieVal = (username: string): string => {
  const expiresAt = Date.now() + SESSION_EXPIRY_MS;
  const payload: SessionPayload = { username, expiresAt };
  const payloadStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadStr).toString('base64');
  
  // Create signature
  const hmac = crypto.createHmac('sha256', getSecret());
  hmac.update(base64Payload);
  const signature = hmac.digest('hex');
  
  return `${base64Payload}.${signature}`;
};

// Validate request session from cookies
export const verifySession = (req: NextRequest): boolean => {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie || !cookie.value) {
    return false;
  }
  
  const parts = cookie.value.split('.');
  if (parts.length !== 2) {
    return false;
  }
  
  const [base64Payload, signature] = parts;
  
  // Verify signature
  const hmac = crypto.createHmac('sha256', getSecret());
  hmac.update(base64Payload);
  const expectedSignature = hmac.digest('hex');
  
  if (signature !== expectedSignature) {
    return false;
  }
  
  try {
    const payloadStr = Buffer.from(base64Payload, 'base64').toString('utf-8');
    const payload: SessionPayload = JSON.parse(payloadStr);
    
    // Check expiration
    if (Date.now() > payload.expiresAt) {
      return false;
    }
    
    const creds = getAdminCreds();
    return payload.username === creds.username;
  } catch {
    return false;
  }
};

export const getSessionCookieName = () => SESSION_COOKIE_NAME;
