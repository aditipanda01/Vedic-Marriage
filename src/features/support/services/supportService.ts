import api from '@/services/axios';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

export interface CreateTicketPayload {
  category: string;
  subCategory: string;
  issue: string;
}

export interface SupportTicketDto {
  id: string;
  category: string;
  status: string;
  createdAt: string;
}

export interface SupportMessageDto {
  id: string;
  text: string;
  author: 'user' | 'support' | string;
  createdAt: string;
}

export const supportService = {
  async createTicket(payload: CreateTicketPayload) {
    const res = await api.post(API_ENDPOINTS.SUPPORT.TICKETS, payload);
    return res.data;
  },

  async listTickets(params?: { limit?: number; cursor?: string }) {
    const res = await api.get(API_ENDPOINTS.SUPPORT.TICKETS, { params });
    return res.data;
  },

  async getTicket(id: string) {
    const res = await api.get(API_ENDPOINTS.SUPPORT.TICKET_BY_ID(id));
    return res.data;
  },

  async addMessage(id: string, text: string) {
    const res = await api.post(API_ENDPOINTS.SUPPORT.TICKET_MESSAGES(id), { text });
    return res.data;
  },

  async listMessages(id: string, params?: { limit?: number; cursor?: string }) {
    const res = await api.get(API_ENDPOINTS.SUPPORT.TICKET_MESSAGES(id), { params });
    return res.data;
  },
};


