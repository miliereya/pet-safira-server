const AdPosterModel = require('../models/adPoster.model')

class AdPosterService {
    async getAdPosters(){
        const adPosterData = await AdPosterModel.find()
        return adPosterData
    }

}

module.exports = new AdPosterService()