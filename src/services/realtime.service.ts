import { io, type Socket } from "socket.io-client";
import { API_BASE_URL } from "@/lib/axios";

/**
 * Derive the websocket URL from the REST API base URL.
 *  - https://kinetiq-api.saikat.com.bd/api/v1  →  wss://kinetiq-api.saikat.com.bd/admin
 *  - http://localhost:4000/api/v1             →  ws://localhost:4000/admin
 *
 * The websocket namespace is `/admin` (see RealtimeGateway on the backend);
 * it is mounted directly on the HTTP server, not under the REST prefix.
 */
function deriveSocketUrl(): string {
  const url = new URL(API_BASE_URL);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  // Strip the REST prefix and append the gateway namespace.
  url.pathname = "/admin";
  return url.toString().replace(/\/$/, "");
}

export const SOCKET_URL = deriveSocketUrl();

/** Payload shapes exchanged with the realtime gateway. */
export interface NewMessagePayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageUpdatedPayload {
  id: string;
  isRead: boolean;
}

export interface MessageDeletedPayload {
  id: string;
}

type Listener<T> = (payload: T) => void;

class RealtimeClient {
  private socket: Socket | null = null;
  private token: string | null = null;

  /** Open (or reuse) the connection authenticated with the given JWT. */
  connect(token: string): Socket {
    // If we're already connected with the same token, no-op.
    if (this.socket && this.socket.connected && this.token === token) {
      return this.socket;
    }

    if (this.socket) {
      this.disconnect();
    }

    this.token = token;
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1500,
      reconnectionDelayMax: 10_000,
      reconnectionAttempts: Infinity,
      timeout: 15_000,
      autoConnect: true,
    });

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.token = null;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return !!this.socket?.connected;
  }

  onNewMessage(listener: Listener<NewMessagePayload>): () => void {
    if (!this.socket) return () => undefined;
    this.socket.on("message:new", listener);
    return () => this.socket?.off("message:new", listener);
  }

  onMessageUpdated(listener: Listener<MessageUpdatedPayload>): () => void {
    if (!this.socket) return () => undefined;
    this.socket.on("message:updated", listener);
    return () => this.socket?.off("message:updated", listener);
  }

  onMessageDeleted(listener: Listener<MessageDeletedPayload>): () => void {
    if (!this.socket) return () => undefined;
    this.socket.on("message:deleted", listener);
    return () => this.socket?.off("message:deleted", listener);
  }
}

/**
 * Shared singleton so every component on the admin panel talks to the same
 * websocket connection.
 */
export const realtime = new RealtimeClient();