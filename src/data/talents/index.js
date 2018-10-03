import merge from 'deepmerge';
import * as CRB from './CRB.json'
import * as ROT from './ROT.json'

export const talents = merge.all([CRB, ROT]);