const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['service', 'manufacturing'],
        required: true
    },
    profileImg: {
        type: String,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    mainCategory: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    address: {
        place: {
            type: String,
        },
        pincode: {
            type: String,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            index: '2dsphere'
        }
    },
    phone: {
        type: String,
        required: true
    },
    timing: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            isOpen: {
                type: Boolean,
                default: false
            }
        }

    ],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    photosGallery: [String],
    modeOfPayment: [],
    ratingsReviews: [{
        rating: {
            type: Number,
        },
        review: {
            type: String,
        }
    }],
    socialLinks: {
        website: String,
        instagram: String,
        whatsapp: String,
        twitter: String,
        facebook: String,
        youtube: String
    },
    faqs: [{
        question: {
            type: String,
        },
        answer: {
            type: String,
        }
    }]
}, {
    timestamps: true // adds createdAt and updatedAt fields
});




BusinessSchema.pre('save', async function (next) {
    try {
      const business = this;
      const existingBusiness = await mongoose.model('Business').findOne({ name: business.name });
  
      if (existingBusiness) {
        const err = new Error('Business with this name already exists');
        err.status = 409; // conflict status code
        return next(err);
      }
  
      next();
    } catch (error) {
      next(error);
    }
  });


  
module.exports = mongoose.model('Business', BusinessSchema);
