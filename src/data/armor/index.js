import {default as CRB} from './CRB'
import {default as ROT} from './ROT'
import merge from 'deepmerge';

export const armor = merge.all([CRB, ROT]);