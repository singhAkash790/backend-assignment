const mongoose= require('mongoose')

const projectSchema= mongoose.Schema(
    {
        Id: {
            type: Number,
            unique: true
        },
        project_name: {
            type: String,
            default: 'Text'
        },
        open_cost: {
            type: mongoose.Decimal128,
            default: 5
        },
        target_opens: {
            type: Number,
            default: 100
        },
        click_cost: {
            type: mongoose.Decimal128,
            default: 5
        },
        target_clicks: {
            type: Number,
            default: 50
        },
        status: {
            type: Number,
            default: 1
        }

    }
);

const Project =mongoose.model('Project',projectSchema);


const campaignsSchema= mongoose.Schema(
    {
        Id: {
            type: Number,
            unique: true
        },
        project_id: {
            type: Number,
            default: ""
        },
        campaigns_name: {
            type: String,
            default: 'Text'
        },
        opens: {
            type: Number,
            default: 0
        },
        click: {
            type: Number,
            default: 0
        },
        status: {
            type: Boolean,
            default: 1
        }

    }
)


const Campaigns = mongoose.model('Campaigns',campaignsSchema);


const projectStatusSchema = mongoose.Schema(
    {
        Id: {
            type: Number,
            unique: true
        },
        project_name: {
            type: Number,
            default: ""
        },
        campaigns_total: {
            type: String,
            default: 'Text'
        },
        
        total_opens_required: {
            type: Number,
            default: 0
        },
        
        total_opens_achive: {
            type: Number,
            default: 0
        },
        total_click_required: {
            type: Number,
            default: 0
        },
        total_click_achive: {
            type: Number,
            default: 0
        },
        total_open_cost: {
            type: Number,
            default: 0
        },
        click_cost: {
            type: Number,
            default: 0
        },
         total_click_cost: {
            type: Number,
            default: 0
        },
        status: {
            type: Boolean,
            default: 1
        } 
    }
);
const ProjectStatus = mongoose.model('ProjectStatus',projectStatusSchema);


module.exports=Project;
module.exports=Campaigns;
module.exports=ProjectStatus;
