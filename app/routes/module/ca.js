var data = { 
  old:{
        young_young:0.14,
        young:0.15, 
        middle:0.262,
        old:0.243,
        old_old:0.2
    },
    sex:{
        man:0.506,
        woman:0.494,
    },
    city:{
        Moscow:0.2,
        Piter:0.14,
        million:0.25,
        not_million:0.4
    },
    pay:{
        sto:0.04,
        pytdesat:0.245,
        do_50:0.291,
        do_25:0.568
        
    }
};
var params = {
  sex:1,
  old:1,
  city:1,
  pay:1
}

module.exports =  {
  counting:  function(req){
        if(!req){
            return 'undefiended req'
          }
        if (req.body.sex=="Male"){
            params.sex=data.sex.man;
         }
        else if (req.body.sex=="Famale" ){
             params.sex=data.sex.woman
           }
        else {
          params.sex=1;
        }
       
        if (req.body.old=="15-19"){
          params.old=data.old.young_young;
       }
        else if (req.body.old=="20-24" ){
           params.old=data.old.young
         }
         else if (req.body.old=="25-34" ){
          params.old=data.old.middle
        }
        else if (req.body.old=="35-49" ){
          params.old=data.old.old
        }
        else if (req.body.old=="50-70" ){
          params.old=data.old.old_old
        }
        else {
          params.old=1;
        }
        
    
    
    
    
        if (req.body.city=="Moscow"){
          params.city=data.city.Moscow;
       }
        else if (req.body.city=="Piter" ){
           params.city=data.city.Piter
         }
         else if (req.body.city=="million" ){
          params.city=data.city.million
        }
        else if (req.body.city=="m-250" ){
          params.city=data.city.not_million
        }
        else {
          params.city=1;
        }
    
        if (req.body.pay=="10-25"){
          params.pay=data.pay.do_25;
       }
        else if (req.body.pay=="25-49" ){
           params.pay=data.pay.do_50
         }
         else if (req.body.pay=="50-99" ){
          params.pay=data.pay.pytdesat
        }
        else if (req.body.pay=="99_more" ){
          params.pay=data.pay.sto
        }
        else {
          params.pay=1;
        }
        var sum =74000000;
        for (var date in params){
          sum=params[date]*sum;
        }
        return(sum);
      }

}
