import {CRB} from './CRB'
import {ROT} from './ROT'
import merge from 'deepmerge';

export const armor = merge.all([CRB, ROT]);