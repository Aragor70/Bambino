const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    age:{
        type: Date
    },
    gender:{
        type: String
    },
    location:{
        type: String
    },
    passion:{
        type: String
    },
    status:{
        type: [String]
    },
    skills:{
        type: String        
    },
    bio:{
        type: String,
        required: true
    },
    githubusername:{
        type: String
    },
    quote: [
        {
            title:{
                type: String,
                required: true
            },
            content:{
                type: String,
                required: true
            },
            location:{
                type: String,
                required: true
            },
            author:{
                type: String,
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    recommendation: [
        {
            title:{
                type: String,
                required: true
            },
            author:{
                type: String,
                required: true
            },
            description:{
                type: String
            },
            location:{
                type: String,
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    subscribes:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name:{
            type: String
        },
        avatar:{
            type: String
        },
        author:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        }   
    }],
    social:[{
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    }],
    footer:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name:{
            type: String
        },
        avatar:{
            type: String
        },
        text:{
            type: String,
            require: true
        }
    }],
    pictures:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name:{
            type: String
        },
        avatar:{
            type: String
        },
        fileName:{
            type: String
        }
    }],
    myfile:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name:{
            type: String
        },
        avatar:{
            type: String
        },
        filePath:{
            type: String
        },
        fileName:{
            type: String
        }
    }],
    logs:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        name:{
            type: String
        },
        avatar:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);