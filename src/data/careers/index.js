import merge from 'deepmerge';
import {CRB} from './CRB'
import {ROT} from './ROT'

export const careers = merge.all([CRB, ROT]);