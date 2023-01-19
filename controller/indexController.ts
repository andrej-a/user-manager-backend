import responce from '../responce';

const index = (req: any, res: { json: (arg0: { status: number; values: any; }) => void; end: () => void; }) => {
    responce(200, 'Server is running', res);

};

export default index;