var express = require('express');
var multer = require('multer');
var model = require('../models/dbmodel'); // load the portfolio model
var router = express.Router();
var fs = require('fs-extra');

var to_address = "";
//-----------------------------------------------------------------------------------------------
//Generic functions
//-----------------------------------------------------------------------------------------------
function deleteFile(file){
    fs.stat('./public/'+file, function (err, stats) {
        if (err) {
            return console.error(err);
        }

        fs.unlink('./public/'+file,function(err){
            if(err) 
                return console.log(err);
        });  
    });
}
function deleteUnrequiredResources(files, path){
	if(files.length > 0){
	    fs.readdir(path, function (err, result){
	        newPath = path.split("./public");
	        newPath = newPath[1];
	        if(result){
	            result.forEach(function (val, key){
	                var exists = false;
	                for(var i = 0; i < files.length; i++){
	                    if(val.toUpperCase() === files[i].toUpperCase()){
	                        exists = true;
	                        break;
	                    }
	                }
	                if(!exists){
	                    deleteFile(newPath+val);
	                }
	            });
	        }
	    });
	}
}
function createDirectory (dir) {
    fs.stat('./public/img/project/'+dir, function (err, stats){

        if(err){
            fs.mkdirs('./public/img/project/'+dir, function(err){
                if (err) return console.error(err);

                console.log("New directory created")
            });
        }
    });
}
function deleteDirectory (dir) {
    fs.stat('./public/img/project/'+dir, function (err, stats){
        if(err){}
        else{
            fs.remove('./public/img/project/'+dir, function(err){
              if (err) return console.error(err);
              
              console.log("Directory removed successfully");
            });
        }
    });
}
function deleteUnrequiredFolders(files, path){
	if(files.length > 0){
	    fs.readdir(path, function (err, result){
	        result.forEach(function (val, key){
	            var exists = false;
	            for(var i = 0; i < files.length; i++){
	                if(val.toUpperCase() === files[i].toUpperCase()){
	                    exists = true;
	                    break;
	                }
	            }
	            if(!exists){
	                fs.remove(path + val, function(err){
	                    if (err) return console.error(err);
	                    console.log("Directory removed successfully");
	                });
	            }
	        });
	    });
	}
}
function copy () {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    readStream.on('error', callback);
    writeStream.on('error', callback);
    readStream.on('close', function () {
        fs.unlink(oldPath, callback);
    });
    readStream.pipe(writeStream);
}
function move (oldPath, newPath, dir, callback) {
    fs.stat('./public/img/project/'+dir, function (err, stats){
        if(err){
            fs.mkdirs('./public/img/project/'+dir, function(err){
                if (err) return console.error(err);

                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        if (err.code === 'EXDEV') {
                            copy();
                        } else {
                            callback(err);
                        }
                        return;
                    }
                    callback();
                });  
            });
        }else{
            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    if (err.code === 'EXDEV') {
                        copy();
                    } else {
                        callback(err);
                    }
                    return;
                }
                callback();
            });
        }
    });
}
//-----------------------------------------------------------------------------------------------
//Routes for Hero section
//-----------------------------------------------------------------------------------------------
router.route('/hero')
    .get(function(req, res) {
        model.hero.find(function (err, result) {

            if (err)
                res.send(err);
            res.json(result);
        });
    })
    .post(function (req, res) {
    
        model.hero.create({
            image : req.body.image,
            text : req.body.text
        }, function (err, result) {
            if (err)
                res.send(err);

            model.hero.find(function (err, result) {
                if (err)
                    res.send(err);
                
                res.json(result);
            });
        });
    })
    .put(function (req, res){
        var query = {_id : req.body._id};
        model.hero.update(query,{
            image : req.body.image,
            text : req.body.text
        },{
            multi : false
        }, function (err, result) {
            if (err)
                res.send(err);
            model.hero.find(function (err, result) {
                if (err)
                    res.send(err);
                
                res.json(result);
            });
        });
    })
    .delete(function (req, res) {
        model.hero.remove({
            _id : req.body._id
        }, function (err, result) {
            if(err)
                res.send(err);
             model.hero.find(function (err, result) {
                if (err)
                    res.send(err);
                
                res.json(result);
            });
        });
    });

var storageHero = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/img/landing')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadHero = multer({ 
    storage: storageHero
}).single('file');

router.route('/hero/img')
    .post( function (req, res) {
        uploadHero(req,res,function (err){
            if(err){
                console.log(err);
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null});
        })
    })
    .delete( function (req, res) {
        if(Array.isArray(req.body.file)){
            var files = req.body.file;
            deleteUnrequiredResources(files, './public/img/landing/');
        }else{
            deleteFile(req.body.file);
        }
    });
//-----------------------------------------------------------------------------------------------
//Routes for portfolio section
//-----------------------------------------------------------------------------------------------
router.route('/portfolio/main')
    .get(function (req, res){
        model.portfolioMain.find(function (err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    })
    .post(function (req, res){
        model.portfolioMain.create({
            name : req.body.name,
            overview : req.body.overview,
            technology : req.body.technology,
            url : req.body.url,
            category : req.body.category,
            client : req.body.client,
            role : req.body.role,
            complete : req.body.complete,
            image : req.body.image

        }, function (err, result) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            model.portfolioMain.find(function (err, result) {
                if (err)
                    res.send(err);
                
                res.json(result);
            });
        });
    })
    .put(function (req, res){
        var query = {_id : req.body._id};
        model.portfolioMain.update(query,{
            overview : req.body.overview,
            technology : req.body.technology,
            url : req.body.url,
            category : req.body.category,
            client : req.body.client,
            role : req.body.role,
            complete : req.body.complete,
            image : req.body.image
        },{
            multi : false
        }, function (err, result) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            model.portfolioMain.find(function (err, result) {
                if (err)
                    res.send(err);
                
                res.json(result);
            });
        })
    })
    .delete(function (req, res){
        deleteDirectory (req.body.name);
        model.portfolioMain.remove({
            _id : req.body._id
        }, function (err, result) {
            if(err)
                res.send(err);
           
            model.portfolioSub.remove({
                key : req.body._id
            }, function (err, result){
                if(err)
                    res.send(err);
                 model.portfolioMain.find(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result);
                 });
            });
        })
    });

router.route('/portfolio/sub/:id')
    .get(function (req, res){
        model.portfolioSub.find({'key' : req.params.id}, function (err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    })
router.route('/portfolio/sub')
    .post(function (req, res){
        model.portfolioSub.create({
            image : req.body.image,
            key : req.body.key,
            name : req.body.name,
            description : req.body.description
        }, function (err, result) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            model.portfolioSub.find({'key' : req.body.key}, function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .put(function (req, res){
        if(req.body.oldImage){
            // Delete the image file from directory
            deleteFile(req.body.oldImage);
        }
        var query = {_id : req.body._id};
        model.portfolioSub.update(query,{
            image : req.body.image,
            key : req.body.key,
            description : req.body.description
        },{
            multi : false
        }, function (err, result) {
            if (err)
                res.send(err);

            model.portfolioSub.find({'key' : req.body.key}, function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        })
    })
    .delete(function (req, res){
        deleteFile(req.body.image);
        model.portfolioSub.remove({
            _id : req.body._id
        }, function (err, result) {
            if(err)
                res.send(err);
            model.portfolioSub.find({'key' : req.body.key}, function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        })
    });

var storageProject = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/img/temp')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});
var uploadProject = multer({ 
    storage: storageProject
}).single('file');
router.route('/portfolio/img')
    .post( function (req, res) {
        uploadProject(req,res,function (err){
            if(err){
                console.log('ERROR');
                console.log(err);
                res.json({error_code:1,err_desc:err});
                return;
            }
            var oldPath = './public/img/temp/' + req.body.name,
                newPath = './public/img/project/' +req.body.dir+'/'+ req.body.name,
                dir = req.body.dir;
            move(oldPath, newPath, dir, function (err){
                if(err){
                    console.log(err);
                }
            });
            res.json({error_code:0,err_desc:null});
        })
    })
    .delete( function (req, res) {
        if(Array.isArray(req.body.file)){
            var files = req.body.file;
            var path = req.body.path;
            if(req.body.hasOwnProperty('folder')){
                if(req.body.folder){
    	            deleteUnrequiredFolders(files, path);
    	        }else{
    	        	deleteUnrequiredResources(files, path);
    	        }
            }
        }else{
            deleteFile(req.body.file);
        }
    });
//-----------------------------------------------------------------------------------------------
//Routes for service section
//-----------------------------------------------------------------------------------------------
router.route('/service')
    .get(function (req, res){
        model.service.find(function (err, result){
            if (err)
                res.send(err);
            res.json(result);
        })
    })
    .post(function (req, res){
        model.service.create({
            title : req.body.title,
            image : req.body.image,
            link : req.body.link
        }, function (err, result) {
            if (err)
                res.send(err);
            model.service.find(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .put(function (req, res){
        var query = {_id : req.body._id};
        model.service.update(query,{
            title : req.body.title,
            image : req.body.image,
            link : req.body.link
        },{
            multi : false
        }, function (err, result) {
            if (err)
                res.send(err);
            model.service.find(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .delete(function (req, res){
        model.service.remove({
            _id : req.body._id
        }, function (err, result) {
            if(err)
                res.send(err);
             model.service.find(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        })
    });
var storageService = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/img/service')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadService = multer({ 
    storage: storageService
}).single('file');

router.route('/service/img')
    .post( function (req, res) {
        uploadService(req,res,function (err){
            if(err){
                console.log(err);
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null});
        })
    })
    .delete( function (req, res) {
        if(Array.isArray(req.body.file)){
            var files = req.body.file;
            deleteUnrequiredResources(files, './public/img/service/');
        }else{
            deleteFile(req.body.file);
        }
    });
//-----------------------------------------------------------------------------------------------
//Routes for about section
//-----------------------------------------------------------------------------------------------
router.route('/about')
    .get(function (req, res){
        model.about.find(function (err, result){
            if (err)
                res.send(err);
            res.json(result);
        })
    })
    .post(function (req, res){
        model.about.create({
            name : req.body.name,
            description : req.body.description,
            aboutImage : req.body.aboutImage,
            dob : req.body.dob,
            nationality : req.body.nationality,
            languages : req.body.languages,
            interestImage : req.body.interestImage,
            interests : req.body.interests,
            hobbyImage : req.body.hobbyImage,
            hobbies : req.body.hobbies
        }, function (err, result) {
            if (err)
                res.send(err);
            model.about.find(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .put(function (req, res){
        var query = {_id : req.body._id};
        model.about.update(query,{
            name : req.body.name,
            description : req.body.description,
            aboutImage : req.body.aboutImage,
            dob : req.body.dob,
            nationality : req.body.nationality,
            languages : req.body.languages,
            interestImage : req.body.interestImage,
            interests : req.body.interests,
            hobbyImage : req.body.hobbyImage,
            hobbies : req.body.hobbies
        },{
            multi : false
        }, function (err, result) {
            if (err)
                res.send(err);
            model.about.find(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    });
var storageAbout = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/img/about')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadAbout = multer({ 
    storage: storageAbout
}).single('file');

router.route('/about/img')
    .post( function (req, res) {
        uploadAbout(req,res,function (err){
            if(err){
                console.log(err);
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null});
        })
    })
    .delete( function (req, res) {
        if(Array.isArray(req.body.file)){
            var files = req.body.file;
            deleteUnrequiredResources(files, './public/img/about/');
        }else{
            deleteFile(req.body.file);
        }
    });
//-----------------------------------------------------------------------------------------------
//Routes for about section
//-----------------------------------------------------------------------------------------------
router.route('/skill')
    .get(function (req, res){
        model.skill.find(function (err, result){
            if (err)
                res.send(err);
            res.json(result);
        });
    })
    .post(function (req, res){
        model.skill.create({
            category : req.body.category,
            name : req.body.name,
            percentage : req.body.percentage
        }, function (err, result){
            if (err)
                res.send(err);
            model.skill.find(function (err, result){
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .put(function (req, res){
        var query = { _id : req.body._id};
        model.skill.update(query, {
            category : req.body.category,
            name : req.body.name,
            percentage : req.body.percentage
        }, {
            multi : false
        }, function (err, result){
            if (err)
                res.send(err);
            model.skill.find(function (err, result){
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .delete(function (req, res){
        model.skill.remove({
            _id : req.body._id
        }, function (err, result){
            if (err)
                res.send(err);
            model.skill.find(function (err, result){
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    });
//-----------------------------------------------------------------------------------------------
//Routes for experience section
//-----------------------------------------------------------------------------------------------
router.route('/experience')
    .get(function (req, res){
        model.experience.find(function (err, result){
            if(err)
                res.send(err);
            res.json(result);
        });
    })
    .post(function (req, res){
        model.experience.create({
            work : req.body.work,
            image : req.body.image,
            title : req.body.title,
            organization : req.body.organization,
            designation : req.body.designation,
            description : req.body.description,
            start : req.body.start,
            end : req.body.end
        }, function (err, result){
            if(err)
                res.send(err);
            model.experience.find(function (err, result){
                if(err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .put(function (req, res){
        var query = { _id : req.body._id };
        model.experience.update(query, {
            work : req.body.work,
            image : req.body.image,
            title : req.body.title,
            organization : req.body.organization,
            designation : req.body.designation,
            description : req.body.description,
            start : req.body.start,
            end : req.body.end
        },{
            multi : false
        }, function (err, result){
            if(err)
                res.send(err);
            model.experience.find(function (err, result){
                if(err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .delete(function (err, result){
        model.experience.remove({
            _id : req.body._id
        }, function (err, result){
            if(err)
                res.send(err);
            model.experience.find(function (err, result){
                if(err)
                    res.send(err);
                res.json(result);
            });
        });
    })
var storageExperience = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/img/experience')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadExperience = multer({ 
    storage: storageExperience
}).single('file');

router.route('/experience/img')
    .post( function (req, res) {
        uploadExperience(req,res,function (err){
            if(err){
                console.log(err);
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null});
        })
    })
    .delete( function (req, res) {
        if(Array.isArray(req.body.file)){
            var files = req.body.file;
            deleteUnrequiredResources(files, './public/img/experience/');
        }else{
            deleteFile(req.body.file);
        }
    });
//-----------------------------------------------------------------------------------------------
//Routes for contact section
//-----------------------------------------------------------------------------------------------
router.route('/contact')
    .get( function (req, res){
        model.contact.find(function (err, result){
            if (err)
                res.send(err);
            res.json(result);
            if(result.length > 0)
                to_address = result[0].email;
        });
    })
    .post( function (req, res){
        model.contact.create({
            address : req.body.address,
            phone : req.body.phone,
            email : req.body.email
        }, function (err, result){
            if (err)
                res.send(err);
            model.contact.find(function (err, result){
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .put( function (req, res){
        var query = { _id : req.body._id };
        model.contact.update( query, {
            address : req.body.address,
            phone : req.body.phone,
            email : req.body.email
        },{
            multi: false
        }, function (err, result){
            if (err)
                res.send(err);
            model.contact.find(function (err, result){
                if (err)
                    res.send(err);
                res.json(result);
            });
        });
    });
//-----------------------------------------------------------------------------------------------
//Routes for social section
//-----------------------------------------------------------------------------------------------
router.route('/social')
    .get(function (req, res){
        model.social.find(function (err, result){
            if(err)
                res.send(err);
            res.json(result);
        });
    })
    .post(function (req, res){
        model.social.create({
            url : req.body.url,
            image : req.body.image
        }, function (err, result){
            if(err)
                res.send(err);
            model.social.find(function (err, result){
                if(err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .put(function (req, res){
        var query = { _id : req.body._id };
        model.social.update(query, {
            url : req.body.url,
            image : req.body.image
        },{
            multi : false
        }, function (err, result){
            if(err)
                res.send(err);
            model.social.find(function (err, result){
                if(err)
                    res.send(err);
                res.json(result);
            });
        });
    })
    .delete(function (req, res){
        model.social.remove({
            _id : req.body._id
        }, function (err, result){
            if(err)
                res.send(err);
            model.social.find(function (err, result){
                if(err)
                    res.send(err);
                res.json(result);
            });
        });
    })
var storageSocial = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public/img/social')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadSocial = multer({ 
    storage: storageSocial
}).single('file');

router.route('/social/img')
    .post( function (req, res) {
        uploadSocial(req,res,function (err){
            if(err){
                console.log(err);
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null});
        })
    })
    .delete( function (req, res) {
        if(Array.isArray(req.body.file)){
            var files = req.body.file;
            deleteUnrequiredResources(files, './public/img/social/');
        }else{
            deleteFile(req.body.file);
        }
    });
//-----------------------------------------------------------------------------------------------
//Routes for email section
//-----------------------------------------------------------------------------------------------
router.route('/email')
    .post( function (req, res) {
        var sg_username = '';
        var sg_password = '';
        model.credential.find(function (err, result){
            if(err)
                res.send(err);
            if(result.length > 0){
                sg_username = result[0].emailserviceusername;
                sg_password = result[0].emailservicepassword;
            }
            var sendgrid = require("sendgrid")(sg_username, sg_password);
            var from_address = req.body.from_address;
            // SUBJECT
            var subject = "Email from "+ req.body.name;
            // TEXT BODY
            var text_body = req.body.text_body;
            console.log({
                    to:         to_address,
                    from:       from_address,
                    subject:    subject,
                    text:       text_body
                });
            /* SEND THE MAIL */
            try {
                sendgrid.send({
                    to:         to_address,
                    from:       from_address,
                    subject:    subject,
                    text:       text_body
                }, function(err, json) {
                    if (err)
                        res.send(err);
                    res.send(json);
                });
            } catch(e) {
                res.send(e);
            }
        });
    });
//-----------------------------------------------------------------------------------------------
//Routes for login section
//-----------------------------------------------------------------------------------------------
router.route('/login')
    .post( function (req, res) {
        model.credential.find( function (err, result){
            if(err)
                req.send(err);
            if(result.length === 0){
                model.credential.create({
                    loginusername : "admin",
                    loginpassword : "admin",
                    emailserviceusername : "admin",
                    emailservicepassword : "admin"
                }, function (err, result){
                    if(err)
                        res.send(err);
                    model.credential.find(function (err, result){
                        if(err)
                            res.send(err);
                        if(req.body.username === result[0].loginusername){
                            if(req.body.password === result[0].loginpassword){
                                res.sendStatus(200);
                            }else{
                                res.sendStatus(500);
                            }
                        }else{
                            res.sendStatus(500);
                        }
                    });
                });
            }else{
                if(req.body.username === result[0].loginusername){
                    if(req.body.password === result[0].loginpassword){
                        res.sendStatus(200);
                    }else{
                        res.sendStatus(500);
                    }
                }else{
                    res.sendStatus(500);
                }
            }
        });
    })
    .put(function (req, res){
        model.credential.find(function (err, result){
            if(err)
                res.send(err);
            var query = { _id : req.body._id };
            model.credential.update(query, {
                loginusername : req.body.loginusername || result[0].loginusername,
                loginpassword : req.body.loginpassword || result[0].loginpassword,
                emailserviceusername : req.body.emailserviceusername || result[0].emailserviceusername,
                emailservicepassword : req.body.emailservicepassword || result[0].emailservicepassword
            },{
                multi : false
            }, function (err, result){
                if(err)
                    res.send(err);
                model.credential.find(function (err, result){
                    if(err)
                        res.send(err);
                    result[0].loginpassword = "";
                    result[0].emailservicepassword = "";
                    res.json(result);
                });
            });
        });
    })
    .get(function (req, res){
        model.credential.find(function (err, result){
            if(err)
                res.send(err);
            result[0].loginpassword = "";
            result[0].emailservicepassword = "";
            res.json(result);
        });
    });
//-----------------------------------------------------------------------------------------------
//expose the routes to our app with module.exports
//-----------------------------------------------------------------------------------------------
module.exports = router; 
