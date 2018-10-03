import merge from 'deepmerge';
import * as CRB from './CRB.json'
import * as ROT from './ROT.json'

export const gear = merge.all([CRB, ROT]);