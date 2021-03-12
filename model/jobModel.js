const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema ({
     
    user_id : {
        type:Number,
        
        
        
    },
    location : {
        type:String,
        
        
    
    },
    company_name : {
        type:String,
       
        
    },
    total_employee : {
        type:Number,
      
        
    },
    your_name : {
        type:String,
        
        
    }
    ,
    phone_number : {
        type:Number,
       
        
    }
    ,
    jobtitle : {
        type:String,
       
        
    }
    ,
    role : {
        type:String,
      
       
    }
    ,
    job_type : {
        type:String,
        
        
    }
    ,
    min_experience : {
        type:String,
      
        
    }
    ,
    max_experience : {
        type:String,
        
    }
    ,
    min_salary : {
        type:Number,
       
        
    }
    ,
    max_salary : {
        type:Number,
       
        
    }
    ,
    maximum_hires : {
        type:Number,
       
        
    }
    ,
    description : {
        type:String,
      
        
    }
    ,
    skills : {
        type: [],
       
        
    },
    date : {
        type:Date,
        
       default:Date.now()
    }
})

module.exports = mongoose.model('Job',jobSchema);

mongoose.model('Job',jobSchema);

module.exports = mongoose.model('Job')