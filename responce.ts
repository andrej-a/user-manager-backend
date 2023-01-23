const responce = (status: number, values: any, res: { json: any; end: any; status?: any; }) => {
    const data = {
        'status': status,
        'values': values
    };

    res.status(status);
    res.json(data);
    res.end();
}

export default responce;