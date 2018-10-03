import merge from 'deepmerge';
import * as CRB from './CRB.json'
import * as ROT from './ROT.json'

export const craftsmanship = merge.all([CRB, ROT]);