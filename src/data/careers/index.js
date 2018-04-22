import merge from 'deepmerge';
import {default as CRB} from './CRB'
import {default as ROT} from './ROT'

export const careers = merge.all([CRB, ROT]);