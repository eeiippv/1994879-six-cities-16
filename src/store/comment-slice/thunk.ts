import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoint } from '../../const';
import { Comment, CommentEntity } from '../../types/comment';
import { ExtraAxios } from '../type';

export type CommentPost = {
  offerId: string;
  data: CommentEntity;
}

export const fetchComments = createAsyncThunk<Comment[], string, ExtraAxios>(
  'comment/fetchComments',
  async (offerId, { extra: api }) => {
    const response = await api.get<Comment[]>(`${Endpoint.Comments}/${offerId}`);
    return response.data;
  }
);

export const postComment = createAsyncThunk<Comment, CommentPost, ExtraAxios>(
  'comment/postComment',
  async ({ offerId, data }, { extra: api }) => {
    const response = await api.post<Comment>(`${Endpoint.Comments}/${offerId}`, data);
    return response.data;
  }
);
