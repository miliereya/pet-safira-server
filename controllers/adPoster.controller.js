const AdPosterService = require('../service/adPoster.service')

require('dotenv').config()

class AdPosterController {
    async getAdPosters(req, res, next) {
        try {
            const adPosters = await AdPosterService.getAdPosters()
            return res.json(adPosters)
        } catch (e) {
            next(e)
        }
    }
    async AddItem(req, res, next) {
        try {

        } catch (e) {
            
        }
    }
}

module.exports = new AdPosterController()