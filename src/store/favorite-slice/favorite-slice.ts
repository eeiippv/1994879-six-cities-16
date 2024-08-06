import { createSlice } from '@reduxjs/toolkit';
import { Offer, OfferFull } from '../../types/offer';
import { fetchFavorites, applyFavorite } from './thunk';
import { FetchState } from '../type';
import { logout } from '../user-slice/thunk';

export type InitialState = {
  offer: FetchState<OfferFull>;
  offers: FetchState<Offer[]>;
}

const initialState: InitialState = {
  offer: { entity: undefined, status: 'none' },
  offers: { entity: [], status: 'none' },
};

const updateFavorites = (state: InitialState, newOffer: Offer) => {
  const favorites = state.offers.entity || [];
  if (newOffer.isFavorite) {
    state.offers.entity = [...favorites, newOffer];
  } else {
    state.offers.entity = favorites.filter((favoriteOffer) => favoriteOffer.id !== newOffer.id);
  }
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.offers.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.offers.entity = action.payload;
        state.offers.status = 'done';
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.offers.status = 'error';
      })
      .addCase(applyFavorite.pending, (state) => {
        state.offer.status = 'loading';
      })
      .addCase(applyFavorite.fulfilled, (state, action) => {
        updateFavorites(state, action.payload);
        state.offer.status = 'done';
      })
      .addCase(applyFavorite.rejected, (state) => {
        state.offer.status = 'error';
      })
      .addCase(logout.fulfilled, (state) => {
        state.offer = initialState.offer;
        state.offers = initialState.offers;
      });
  }
});
