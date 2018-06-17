import {createSelector} from 'reselect';
import {weapons} from '../data/equipment'

// for now, using the raw data rather than from state, since it won't change
// const equipmentSelector = (state,props) => state[props.type]
const equipmentSelector = () => weapons
const filterBy = (_, props) => props.filterBy

export const equipmentFilter = createSelector(
    equipmentSelector,
    (equipment) => {
        let filteredKeys= Object.keys(equipment).filter(itemKey => {
            let validItems = Object.keys(filterBy).map(filterKey => {
                if (filterBy[filterKey] === equipment[itemKey][filterKey]) {
                    return true
                }
                return false
            }).includes(false)

            return !validItems
        })

        return Object.keys(equipment)
            .filter(key => filteredKeys.includes(key))
            .reduce((acc,key) => {
                return {
                    ...acc,
                    [key]: equipment[key]
                }
            }, {})
    }
)