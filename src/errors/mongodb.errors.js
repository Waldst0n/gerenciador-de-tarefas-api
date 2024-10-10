const notFoundError = (res) => {
    return res.status(404).send('Data not found');
};

const objectIdError = (res) => {
    return res
        .status(500)
        .send('An error occurred while retrieving this data from the database');
};

module.exports = {
    notFoundError,
    objectIdError,
};
