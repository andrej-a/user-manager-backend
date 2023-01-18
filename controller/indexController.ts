import state from '../responce';

const index = (req: any, res: { json: (arg0: { status: number; values: any; }) => void; end: () => void; }) => {
    state('Server is running', res);

};

export default index;