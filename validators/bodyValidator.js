const Joi = require('@hapi/joi');

const signUpValidation = (req,res,next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(), //.pattern(new RegExp('^[a-z]{3,255}$'))
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
        // role:Joi. string().min(6).max(10).optional()
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next();
}


const signInValidation = (req,res,next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next();
}

const jobValidation = (req,res,next) => {
    const schema = Joi.object({
        user_id: Joi.string().min(3).max(255).required(),
        location: Joi.string().min(3).max(255).required(),
        company_name: Joi.string().min(3).max(255).required(),
        total_employee:Joi.string().min(3).max(255).required(),
        your_name: Joi.string().min(3).max(255).required(),
        phone_number: Joi.string().min(10).max(16).required(),
        jobtitle: Joi.string().min(3).max(255).required(),
        role: Joi.string().min(3).max(255).required(),
        job_type: Joi.string().min(3).max(255).required(),
        min_experience: Joi.number().min(0).max(100).required(),
        max_experience: Joi.number().min(0).max(100).required(),
        min_salary: Joi.string().min(4).max(10).required(),
        max_salary: Joi.string().min(4).max(10).required(),
        maximum_hires: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).required(),
        skills: Joi.array().required()
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    next();
}



module.exports.signUpValidation = signUpValidation;
module.exports.signInValidation = signInValidation;
module.exports.jobValidation = jobValidation;
