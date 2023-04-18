const Project = require("../models/project");
const Issue = require('../models/issues');


module.exports.allProjects = async function(req,res){
    try{
        let projects = await Project.find({});
        return res.render('projectHome',{
            projects:projects
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.createProjectPage = function(req,res){
    return res.render('createProjectPage');
}

module.exports.createProject = async function(req,res){
    try{
     //   console.log(req.body);
        await Project.create({
            name:req.body.name,
            description:req.body.description,
            author:req.body.author
        })
        return res.redirect("/");

    }catch(err){
        console.log(err);
    }
}


module.exports.projectParticular =async function(req,res){
    try{
        let proj = await Project.findById(req.params.id);
        const issues = await Issue.find({projectName:req.params.id}).populate('author');
    const authors = issues.map(issue => issue.author);
    const uniqueAuthors = [...new Set(authors)];

        let projectIssues = await Issue.find({ _id: { $in: proj.issues } })
        .populate('title')
        .populate('description')
        .populate('author')
        .populate('labels');
        
        console.log(projectIssues);
        return res.render('Project',{
            project:proj,
            projectIssues:projectIssues,
            labels:proj.labels,
            authors:uniqueAuthors
        })
    }catch(err){
        console.log(err);
    }
    
}

module.exports.filter = async function(req,res){
    try{
        // console.log("11111111111111111111111111111111")
        // console.log("hhere")
        // console.log(req.body);
        let proj = await Project.findById(req.params.id);
      //  return res.redirect('back');
      const issues = await Issue.find({projectName:req.params.id})
    console.log(issues)
    const authors = issues.map(issue => issue.author);
    const uniqueAuthors = [...new Set(authors)];

    const labelFilter = req.body.labelFilter;
    const authorFilter = req.body.authorFilter;

    const filteredIssues = issues.filter(issue => {
       // console.log(issue.labels.includes(labelFilter));
        let hasAuthor=true
        let hasLabel=true
       // console.log(authorFilter)
        if(labelFilter!='')hasLabel = issue.labels.includes(labelFilter) ;
         if(authorFilter)hasAuthor =  issue.author === authorFilter ;
        //console.log(hasAuthor," ",hasLabel)
         return hasLabel && hasAuthor;
    });
//   console.log(filteredIssues)
// console.log("***********************")
return res.render('Project',{
    project:proj,
    projectIssues:filteredIssues,
    labels:proj.labels,
    authors:uniqueAuthors
})
    }catch(err){
        console.log(err)
    }
}


module.exports.createIssuePage =async function(req,res){
try{
    let proj = await Project.findById(req.params.id);
    let existingLabels = proj.labels;

    return res.render('issuePage',{
        project:req.params.id,
        existingLabels:existingLabels
    })
}catch(err){
    console.log(err);
}
}



module.exports.createIssue =async function(req,res){
    try{
        let proj = await Project.findByIdAndUpdate(req.params.id);
    console.log(proj);
        let issue = await Issue.create({
            title:req.body.title,
            description:req.body.description,
            labels:req.body.label,
            author:req.body.author,
            projectName:proj._id

        })
        console.log(issue);
        proj.issues.push(issue._id);
        proj.labels.push(req.body.label);
        await proj.save();
        
        return res.redirect('/proj/' + proj._id);

}catch(err){

    console.log(err);
}
}

