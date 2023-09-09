
const fetch = require('node-fetch');

module.exports.jobPage = async (req, res) => {
    try {
        const response = await fetch('https://remotive.com/api/remote-jobs');
        if (!response.ok) { // handle the error
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return res.render("companies", {
            title: "Jobs Page",
            body: data.jobs
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from remotive.com' });
    }
}