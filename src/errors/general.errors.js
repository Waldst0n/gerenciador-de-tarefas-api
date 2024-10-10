const notAllowedfieldsToUpdateError = (res) => {
    return res.status(500).send('There are non-editable fields');
};

module.exports = {
    notAllowedfieldsToUpdateError,
};
