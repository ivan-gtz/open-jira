import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType = 
   | { type: '[Entry] Add-Entry', payload: Entry }
   | { type: '[Entry] Entry Updated', payload: Entry }
   | { type: '[Entry] Refresh-Data', payload: Entry[] }
   | { type: '[Entry] Delete-Data', payload: Entry }
   | { type: '[Entry] Reset-Data' }

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch ( action.type ) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.payload ]
            }
        case '[Entry] Entry Updated':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if ( entry._id === action.payload._id ) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }
        case '[Entry] Refresh-Data':
            return {
                ...state,
                entries:[ ...action.payload ]
            }
        case '[Entry] Delete-Data':
            return {
                ...state,
                entries: state.entries.filter( entry => ( entry._id !== action.payload._id ))
            }

        case '[Entry] Reset-Data':
            return {
                ...state,
                entries: state.entries.map( entry => ({
                    ...entry,
                    status: 'pending'
                }))
                
            }
        default:
            return state;
    }
}