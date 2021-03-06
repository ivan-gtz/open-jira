import { FC, useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] Add-Entry', payload: data })
    }

    const deleteEntry = async( id: string ) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${id}`);
            console.log(data)
            
            dispatch({ type:'[Entry] Delete-Data', payload: data })
            enqueueSnackbar( 'Se eliminĂ³ la entrada', {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateEntry = async( { _id, status, description }:Entry, showSnackbar = false ) => {
        try {
        const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });

            dispatch({ type: '[Entry] Entry Updated', payload: data });

            if (showSnackbar) {
                enqueueSnackbar( 'Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        } catch (error) {
            console.log({ error });
        }
    }
    const refreshEntries = async(  ) => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data })
    }   

    const resetEntries = async() => {
        await entriesApi.put<Entry[]>('/entries')
        dispatch({type: '[Entry] Reset-Data'});
        enqueueSnackbar( 'Se reseteĂ³ todas las entradas', {
            variant: 'success',
            autoHideDuration: 1800,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
    }

    useEffect(() => {
        refreshEntries()
    }, [])
    

    return ( 
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry,
            deleteEntry,
            resetEntries
        }} >
            { children }
        </EntriesContext.Provider>
    )
};
