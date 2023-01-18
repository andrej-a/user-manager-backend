const state = (values: any, res: { json: (arg0: { status: number; values: any; }) => void; end: () => void; }) => {
    const data = {
        'status': 200,
        'values': values
    };

    res.json(data);
    res.end();
}

export default state;