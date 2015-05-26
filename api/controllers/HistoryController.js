/**
 * HistoryController
 *
 * @description :: Server-side logic for managing histories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'index': function(req, res){
        History.find(function(err, histories){
        
            res.view({
                histories: histories
            });
        
        });
        
	},
	'add': function(req, res){
        var message = '';
        if( req.method == 'POST'){
            History.create( req.params.all(), function(err, history){
                if(err){
                    return res.view({
                        message: err
                    });
                } 
    
                return res.redirect("/history");
            });
        }else{
        
            return res.view({
                message: message
            });
        }
	},
	'destroy': function(req, res, next){
        History.findOne(req.param('id'), function foundAdmin(err, history){
            if(err) return next(err);
            
            if(!admin) return next("No user found");
            
            History.destroy(req.param('id'), function destroyAdmin(err){
                if(err) return next(err);
            })
            
            res.redirect('/history');
        })
	}
	
	
};

