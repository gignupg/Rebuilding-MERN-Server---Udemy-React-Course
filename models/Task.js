const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: 'incomplete'
    },
    created: {
        type: Date,
        default: Date.now
    }, 
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Task', TaskSchema);