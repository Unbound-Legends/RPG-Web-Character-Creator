import {CRB} from './CRB'
import {ROT} from './ROT'
import merge from 'deepmerge';
//import { intersection } from 'lodash-es'

// Unneeded... as long as weapons don't change b/w versions
/*
const imports = [CRB, ROT]

const findDupes = (typeObjects) => {
    let keys = typeObjects.map(obj => {
        return Object.keys(obj)
    })

    return intersection(...keys)
}

let dupes = findDupes(imports)

let mergedImports = imports.map(weaponData => {
    return Object.keys(weaponData).reduce((acc,weapon) => {
        if (dupes.includes(weapon)) {
            let newKey = `${weapon} (${weapon["book"]})`
            return Object.assign(acc, {
                [newKey]: weapon
            }) 
        }

        return weapon
    }, {})
})

export const weapons = Object.assign({}, ...mergedImports)
*/

export const weapons = merge.all([CRB, ROT]);