/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'index': function(req, res){
        
        if(!req.signedCookies.adminId){
            return res.redirect("/admin/login");
        }
        
        Admin.find(function(err, admins){
            res.view({
                admins: admins
            });
        
        });
        
	},
	'login': function(req, res){
        var message = '';
        
        if( req.method == 'POST'){
            Admin.findOne({ email: req.param('email'), password: req.param('password')}, function(err, admin){
                if(admin){
                    res.cookie('adminId', admin.id, { signed: true});
                    return res.redirect("/admin");
                }else{
                    message = "Invalid email or password";
                    return res.view({message: message, layout: null});
                }
            });
            
        }else{
            return res.view({message: message, layout: null});
        }
	},
	'logout': function(req, res){
        res.cookie('adminId', '', { maxAge: -10000 });
        return res.redirect('/admin/login');
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

