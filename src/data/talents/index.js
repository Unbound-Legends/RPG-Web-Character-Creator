import merge from 'deepmerge';
import {CRB} from './CRB'
import {ROT} from './ROT'

export const talents = merge.all([CRB, ROT]);