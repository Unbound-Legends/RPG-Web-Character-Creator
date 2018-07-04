import merge from 'deepmerge';
import {CRB} from './CRB'
import {ROT} from './ROT'

export const archetypeTalents = merge.all([CRB, ROT]);