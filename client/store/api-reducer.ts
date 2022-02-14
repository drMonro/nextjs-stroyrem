import {createApi} from '@reduxjs/toolkit/dist/query/react';
import createAPI from './api';
import {HYDRATE} from 'next-redux-wrapper';

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
    getPokemonByName: builder.query<{ species: { name: string }; sprites: { front_shiny: string } }, string>({
      query: (name) => ({
        url: `pokemon/${name}`,
        method: 'get',
      }),
    }),
    getPokemonList: builder.query<{ results: Array<{ name: string }> }, void>({
      query: () => ({
        url: `pokemon/`,
        method: 'get',
      }),
    }),
  }),
});

export const {useGetPokemonByNameQuery, useGetPokemonListQuery, util: { getRunningOperationPromises }} = apiReducer;
export const { getPokemonByName, getPokemonList } = apiReducer.endpoints;
