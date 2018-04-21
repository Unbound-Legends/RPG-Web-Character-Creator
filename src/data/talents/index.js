import merge from 'deepmerge';
import {default as CRB} from './CRB'
import {default as ROT} from './ROT'

let talents = merge(CRB, ROT);

export default talents;