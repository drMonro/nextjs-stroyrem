import {createApi} from '@reduxjs/toolkit/dist/query/react';
import createAPI from './api';
import {HYDRATE} from 'next-redux-wrapper';
import { Offer as OfferModel } from '../../server/node_modules/@prisma/client';

export const apiReducer = createApi({

  reducerPath: 'api',
  baseQuery: createAPI(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getRandomOffers: builder.query<OfferModel[], number>({
      query: (count) => ({
        url: `offers-random/${count}`,
        method: 'get',
      }),
      // transformResponse: (response:any) => {
      //   console.log(response, 'vase')
      //   return response
      // },
    }),

    // getPokemonByName: builder.query<{ species: { name: string }; sprites: { front_shiny: string } }, string>({
    //   query: (name) => ({
    //     url: `pokemon/${name}`,
    //     method: 'get',
    //   }),
    // }),
    // getPokemonList: builder.query<{ results: Array<{ name: string }> }, void>({
    //   query: () => ({
    //     url: `pokemon/`,
    //     method: 'get',
    //   }),
    // }),
  }),
});

export const {useGetRandomOffersQuery, util: { getRunningOperationPromises }} = apiReducer;
export const { getRandomOffers } = apiReducer.endpoints;
