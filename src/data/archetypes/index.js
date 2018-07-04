import merge from 'deepmerge';
import {CRB} from './CRB'
import {ROT} from './ROT'

export const archetypes = merge.all([CRB, ROT]);