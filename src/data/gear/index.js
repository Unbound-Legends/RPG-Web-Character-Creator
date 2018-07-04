import {CRB} from './CRB'
import {ROT} from './ROT'
import merge from 'deepmerge';

export const gear = merge.all([CRB, ROT]);