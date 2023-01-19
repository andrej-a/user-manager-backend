const responce = (status: number, values: any, res: { json: (arg0: { status: number; values: any; }) => void; end: () => void; }) => {
    const data = {
        'status': status,
        'values': values
    };

    res.json(data);
    res.end();
}

export default responce;