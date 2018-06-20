import {default as CRB} from './CRB'
import {default as ROT} from './ROT'
import merge from 'deepmerge';

export const gear = merge.all([CRB, ROT]);