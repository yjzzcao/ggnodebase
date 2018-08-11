import ID from '../ID';
import DB from 'Common/GetData/DB';

const reducer = {};
reducer[ID] = DB(ID);

export default reducer;