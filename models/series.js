const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slugs');



const serieSchema = new Schema({

    title: {
        type: String, index: true 
    },
    slug: String,
    cover: String,
    backgroundimage: String,
    frontimage: String,
    synopsis: String,
    estate: String,
    type: String,
    tags: [String],
    episodes: [{
        type: Schema.Types.ObjectId,
        ref: 'episode'
    }]
}, {
    timestamps: {}
});


serieSchema.pre('save', async function (next) {
    if (!this.isModified('title')) {
        next(); // skip it
        return; // stop this function from running
    }
    this.slug = slug(this.title);
    // find other stores that have a slug of wes, wes-1, wes-2
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const storesWithSlug = await this.constructor.find({
        slug: slugRegEx
    });
    if (storesWithSlug.length) {
        this.slug = `${this.slug}-${storesWithSlug.length + 1}`; //`` blackstring generacion de cadenas
    }
    next();
    // TODO make more resiliant so slugs are unique
});

serieSchema.statics.getTagsList = function() {
    return this.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
  };

/* function autopopulate(next) {
    this.populate('episodes', 'slug');
    next();
}

serieSchema.pre('find', autopopulate);
serieSchema.pre('findOne', autopopulate);
 */


const Serie = mongoose.model('serie', serieSchema);
module.exports = Serie;