const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  labels: {
    type: [String],
    default: []
  },
  author: {
    type: String,
    required: true
  },
  projectName:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Project'
  }
});

issueSchema.statics.getLabels = async function() {
  const labels = await this.distinct('labels');
  return labels;
}

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
