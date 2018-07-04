const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slugs');


const episodeSchema= new Schema({

    title: {
        type: String,index: true 
    },
    slug: String,
    serieTitle: String,
    chapterTitle: String,
    chapter: Number,
    server: String,
    serverTwo: String,
    imageCap: String,
    download: String,
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'serie'
    }
}, { timestamps: {} }
//{
    //toJSON: { virtuals: true },
    //toObject: { virtuals: true },
//},
//{ runSettersOnQuery: true }

);




//Da error
/* // Define our indexes
episodeSchema.index({
    title: 'text',
});

episodeSchema.index({
    location: 'indexloco'
});
 */

episodeSchema.pre('save', async function (next) {
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

const Episode = mongoose.model('episode', episodeSchema);
module.exports = Episode;
