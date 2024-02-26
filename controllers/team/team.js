const { TeamModel, TeamValidator } = require('../../models/team/team');

module.exports = class Team {

    // Create team
    static async create(req, res) {
        try{
            // validate inputs
            const error = await TeamValidator(req.body);
            if (error.message) return res.status(400).send(error.message);

            const team = await new TeamModel({
                name: req.body.name,
                description: req.body.description,
                members: req.body.members,
                creator: req.body.creator
            }).save();

            if (team) returnres.status(200).json({ msg: `Team created`, code: 200, obj: team }); 
            returnres.status(404).json({ msg: `Team creation failed`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Team creation process failed`, code: 500 });
        }

    }

    // Get all task for a user
    static async getTeams(req, res) {
        try {
            const team = await TeamModel.find({ creator: req.params.creatorId });
            if (team.length > 0) return res.status(200).json({ msg: `All team found`, code: 200, obj: team });
            return res.status(404).json({ msg: `No team found`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Team fetching process failed`, code: 500 });
        }
    }

    // Get specific task for a user
    static async getTeam(req, res) {
        try {
            const team = await TeamModel.findById(req.params.teamId);
            if (team) return res.status(200).json({ msg: `Team found`, code: 200, obj: team });
            return res.status(404).json({ msg: `This team does not exist`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Team fetching process failed`, code: 500 });
        }
    }

    // Update task
    static async update(req, res) {
        try {
            // validate inputs
            const error = await TeamValidator(req.body);
            if (error.message) return res.status(400).send(error.message);

            const updatedTeam = await TeamModel.findByIdAndUpdate(req.body._id, {
                name: req.body.name,
                description: req.body.description
            }, { new: true });

            if (updatedTeam) return res.status(200).json({ msg: `Team updated`, code: 200, obj: updatedTeam });
            return res.status(404).json({ msg: `This team does not exist`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Team update process failed`, code: 500 });
        }
    }

    // Delete task
    static async remove(req, res) {
        try {
            const team = await TeamModel.findByIdAndDelete(req.params.teamId);
            if (team) return res.status(200).json({ msg: `Team deleted`, code: 200, obj: team });
            return res.status(404).json({ msg: `This team does not exist`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Team deletion process failed`, code: 500 });
        }
    }
}