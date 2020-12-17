const jobOpportunity = require("../models/jobOpportunity.js");
const jobCandidate = require("../models/jobCandidate.js");
const { body, validationResult } = require('express-validator');


module.exports = {

    validateNewJob: [
        body('description', "Descricao não pode estar vazia").trim().isEmpty(),
    ],

    async listOne(req, res){
        const _id = req.params.vagaid
        await jobOpportunity.findOne({_id}, (err, job) => {
            if (err) {
                return res.json({errorMessage:'Nenhuma vaga encontrada'});
            }
            return res.json({job});
        });
    },

    async listAllOpen(req, res){
        const isOpen = true
        await jobOpportunity.find({isOpen}, (err, jobs) => {
            if (err) {
                return res.json({errorMessage:'Nenhuma vaga em aberto'});
            }
            return res.json({jobs});
        });
    },

    async applyForJob(req, res) {
        const jobApplyed = {
            jobId: req.params.vagaid,
            candidateId: req.userId,
            isRunning: true
        }

        await jobCandidate.create(jobApplyed, (err, jobA) => {
            if (err){
                return res.json({errorMessage: err})
            }
            return res.json({jobA});
        });
    },

    async cancelApplication(req, res) {
        const isRunning= false
        const jobId = req.params.vagaid
        await jobOpportunity.findOneAndUpdate(jobId, isRunning, (err, jobA) =>{
            if (err){
                return res.json({errorMessage:err});
            }
            return res.json({jobA});
        });
    }
}

