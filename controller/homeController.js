const init = (req, res) => {
    res.status(200).json({ message: 'Product service is up and running...' });
}

module.exports = { init };