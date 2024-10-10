const notFoundError = (res) => {
    return res.status(404).send('Data not found');
};
module.exports = {
    notFoundError,
};
