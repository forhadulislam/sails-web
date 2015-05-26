/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'index': function(req, res){
        Admin.find(function(err, admins){
        
            res.view({
                admins: admins
            });
        
        });
        
	},
	'login': function(req, res){
        var message = '';
        
        
        if( req.method == 'POST'){
            message = "You have posted";   
        }
        
        res.view({
            message: message
        });
	},
	'add': function(req, res){
        var message = '';
        if( req.method == 'POST'){
            Admin.create( req.params.all(), function(err, admin){
                if(err){
                    return res.view({
                        message: err
                    });
                } 
    
                return res.redirect("/admin");
            });
        }else{
        
            return res.view({
                message: message
            });
        }
	},
	'destroy': function(req, res, next){
        Admin.findOne(req.param('id'), function foundAdmin(err, admin){
            if(err) return next(err);
            
            if(!admin) return next("No user found");
            
            Admin.destroy(req.param('id'), function destroyAdmin(err){
                if(err) return next(err);
            })
            
            res.redirect('/admin');
        })
	}
	
};
