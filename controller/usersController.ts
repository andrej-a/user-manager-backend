import state from "../responce";

const users = (req: any, res: { json: (arg0: { status: number; values: any; }) => void; end: () => void; }) => {
    const data = [
        {
            id: '1',
            name: 'Test name One'
        },
        {
            id: '2',
            name: 'Test name Two'
        }
    ]
    
    state(data, res);
}

export default users;